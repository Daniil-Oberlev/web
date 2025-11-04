import type { FastifyReply, FastifyRequest } from 'fastify';

export async function getRoot(
  _request: FastifyRequest,
  _reply: FastifyReply,
) {
  return { root: true };
}

