import { FastifyPluginAsync } from 'fastify';

import { ROUTES } from '../constants/routes.js';
import { getRoot } from '../handlers/root.js';

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get(ROUTES.ROOT, getRoot);
};

export default root;
