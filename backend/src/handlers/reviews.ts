import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../lib/prisma.js';

interface CreateReviewBody {
  productId: string;
  rating: number;
  comment: string;
}

export async function createReview(
  request: FastifyRequest<{ Body: CreateReviewBody }>,
  reply: FastifyReply,
) {
  if (!request.user) {
    return reply.code(401).send({ error: 'Unauthorized' });
  }

  const { productId, rating, comment } = request.body;

  if (!rating || rating < 1 || rating > 5) {
    return reply.code(400).send({ error: 'Rating must be between 1 and 5' });
  }

  if (!comment || comment.trim().length === 0) {
    return reply.code(400).send({ error: 'Comment is required' });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return reply.code(404).send({ error: 'Product not found' });
    }

    const review = await prisma.review.create({
      data: {
        productId,
        userId: request.user.id,
        rating,
        comment: comment.trim(),
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return {
      id: review.id,
      productId: review.productId,
      userId: review.userId,
      rating: review.rating,
      comment: review.comment,
      userEmail: review.user.email,
      createdAt: review.createdAt,
    };
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: 'Failed to create review' });
  }
}

export async function getProductReviews(
  request: FastifyRequest<{ Params: { productId: string } }>,
  reply: FastifyReply,
) {
  const { productId } = request.params;

  try {
    const reviews = await prisma.review.findMany({
      where: { productId },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return reviews.map(
      (review: {
        id: string;
        productId: string;
        userId: string;
        rating: number;
        comment: string;
        user: { email: string };
        createdAt: Date;
      }) => ({
        id: review.id,
        productId: review.productId,
        userId: review.userId,
        rating: review.rating,
        comment: review.comment,
        userEmail: review.user.email,
        createdAt: review.createdAt,
      }),
    );
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: 'Failed to fetch reviews' });
  }
}

