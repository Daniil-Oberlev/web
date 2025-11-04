import { FastifyPluginAsync } from 'fastify';

import { ROUTES } from '../constants/routes.js';
import {
  getAllCategories,
  getAllProducts,
  getCategoryById,
  getProductById,
} from '../handlers/products/index.js';

const products: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get(ROUTES.CATEGORIES.BASE, getAllCategories);
  fastify.get(ROUTES.PRODUCTS.BASE, getAllProducts);
  fastify.get<{ Params: { id: string } }>(
    ROUTES.CATEGORIES.BY_ID,
    getCategoryById,
  );
  fastify.get<{ Params: { id: string } }>(
    ROUTES.PRODUCTS.BY_ID,
    getProductById,
  );
};

export default products;
