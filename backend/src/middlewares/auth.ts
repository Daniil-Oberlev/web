import type { FastifyReply, FastifyRequest } from 'fastify';

import { memcached } from '../lib/memcached.js';
import {
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from '../utils/auth.js';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const accessToken = request.cookies.accessToken;

  const decodedAccess = accessToken ? verifyAccessToken(accessToken) : null;

  if (decodedAccess) {
    request.user = { id: decodedAccess.userId };
    return;
  }

  const refreshToken = request.cookies.refreshToken;
  if (!refreshToken) {
    return reply.code(401).send({ error: 'No tokens' });
  }

  const decodedRefresh = verifyRefreshToken(refreshToken);
  if (!decodedRefresh) {
    return reply.code(401).send({ error: 'Invalid refresh token' });
  }

  const stored = await memcached.get(decodedRefresh.userId);
  if (!stored || stored?.value?.toString() !== refreshToken) {
    return reply.code(401).send({ error: 'Refresh token invalid or revoked' });
  }

  const newAccessToken = generateAccessToken(decodedRefresh.userId);

  reply.setCookie('accessToken', newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });

  request.user = { id: decodedRefresh.userId };
}
