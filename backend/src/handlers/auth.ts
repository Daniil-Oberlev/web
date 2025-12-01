import type { FastifyReply, FastifyRequest } from 'fastify';

import { memcached } from '../lib/memcached.js';
import { prisma } from '../lib/prisma.js';
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  REFRESH_EXPIRY,
  verifyAccessToken,
  verifyRefreshToken,
} from '../utils/auth.js';

interface RegisterBody {
  email: string;
  password: string;
}
interface LoginBody {
  email: string;
  password: string;
}

export async function register(
  request: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply,
) {
  const { email, password } = request.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return reply.code(400).send({ error: 'User already exists' });
  }

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await memcached.set(user.id, refreshToken, { expires: REFRESH_EXPIRY });

  reply.setCookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
  reply.setCookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });

  return { message: 'Registered successfully' };
}

export async function login(
  request: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply,
) {
  const { email, password } = request.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await comparePassword(password, user.password))) {
    return reply.code(401).send({ error: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await memcached.set(user.id, refreshToken, { expires: REFRESH_EXPIRY });

  reply.setCookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
  reply.setCookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });

  return { message: 'Logged in successfully' };
}

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  const refreshToken = request.cookies.refreshToken;
  if (!refreshToken) {
    return reply.code(401).send({ error: 'No refresh token' });
  }

  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    return reply.code(401).send({ error: 'Invalid refresh token' });
  }

  const stored = await memcached.get(decoded.userId);
  if (!stored || stored?.value?.toString() !== refreshToken) {
    return reply.code(401).send({ error: 'Refresh token invalid or revoked' });
  }

  const accessToken = generateAccessToken(decoded.userId);

  reply.setCookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });

  return { message: 'Token refreshed' };
}

export async function logout(request: FastifyRequest, reply: FastifyReply) {
  const refreshToken = request.cookies.refreshToken;

  if (refreshToken) {
    const decoded = verifyRefreshToken(refreshToken);
    if (decoded) {
      await memcached.delete(decoded.userId);
    }
  }

  reply.clearCookie('accessToken', { path: '/' });
  reply.clearCookie('refreshToken', { path: '/' });

  return { message: 'Logged out' };
}

export async function me(request: FastifyRequest, reply: FastifyReply) {
  const token = request.cookies.accessToken;

  if (!token) {
    return reply.code(401).send({ error: 'No token' });
  }

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return reply.code(401).send({ error: 'Invalid or expired token' });
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: { id: true, email: true },
  });

  if (!user) {
    return reply.code(404).send({ error: 'User not found' });
  }

  return reply.send(user);
}
