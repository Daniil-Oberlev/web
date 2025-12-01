import { FastifyPluginAsync } from 'fastify';

import { ROUTES } from '../constants/routes.js';
import { authenticate } from '../middlewares/auth.js';
import { createReview, getProductReviews } from '../handlers/reviews.js';

const reviews: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post<{ Body: { productId: string; rating: number; comment: string } }>(
    ROUTES.REVIEWS.BASE,
    { preHandler: authenticate },
    createReview,
  );
  fastify.get<{ Params: { productId: string } }>(
    ROUTES.REVIEWS.BY_PRODUCT,
    getProductReviews,
  );
};

export default reviews;

