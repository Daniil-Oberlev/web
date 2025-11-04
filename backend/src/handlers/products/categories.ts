import type { FastifyReply, FastifyRequest } from 'fastify';

import type { Category } from '../../@types/index.js';
import { prisma } from '../../lib/prisma.js';

export async function getAllCategories(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<Category[]> {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return categories.map(
      (
        category: {
          id: string;
          name: string;
          products: Array<{
            id: string;
            name: string;
            price: string;
            description: string;
            image: string;
          }>;
        },
        index: number,
      ) => ({
        id: index + 1,
        _id: category.id,
        name: category.name,
        products: category.products.map(
          (
            product: {
              id: string;
              name: string;
              price: string;
              description: string;
              image: string;
            },
            pIndex: number,
          ) => ({
            id: (index + 1) * 100 + pIndex + 1,
            _id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
          }),
        ),
      }),
    );
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: 'Failed to fetch categories' });
  }
}

export async function getCategoryById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: request.params.id,
      },
      include: {
        products: true,
      },
    });

    if (!category) {
      return reply.code(404).send({ error: 'Category not found' });
    }

    return {
      id: parseInt(category.id, 16) || 0,
      name: category.name,
      products: category.products.map(
        (product: {
          id: string;
          name: string;
          price: string;
          description: string;
          image: string;
        }) => ({
          id: parseInt(product.id, 16) || 0,
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image,
        }),
      ),
    };
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: 'Failed to fetch category' });
  }
}
