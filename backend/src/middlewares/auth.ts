import type { FastifyReply, FastifyRequest } from 'fastify';

import { verifyAccessToken } from '../utils/auth.js';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const token = request.cookies.accessToken;
  if (!token) return reply.code(401).send({ error: 'No access token' });

  const decoded = verifyAccessToken(token);
  if (!decoded) return reply.code(401).send({ error: 'Invalid access token' });

  request.user = { id: decoded.userId };
}
