import { FastifyPluginAsync } from 'fastify';

import { ROUTES } from '../constants/routes.js';
import { login, logout, refresh, register } from '../handlers/auth.js';

const auth: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post(ROUTES.AUTH.REGISTER, register);
  fastify.post(ROUTES.AUTH.LOGIN, login);
  fastify.post(ROUTES.AUTH.REFRESH, refresh);
  fastify.post(ROUTES.AUTH.LOGOUT, logout);
};

export default auth;
