import type { FastifyReply, FastifyRequest } from 'fastify';

import type { Product } from '../../@types/index.js';
import { prisma } from '../../lib/prisma.js';

export async function getAllProducts(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return products.map(
      (
        product: {
          id: string;
          name: string;
          price: string;
          description: string;
          image: string;
          category: { name: string };
        },
        index: number,
      ) => ({
        id: index + 1,
        _id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        categoryId: 0,
        categoryName: product.category.name,
      }),
    );
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: 'Failed to fetch products' });
  }
}

export async function getProductById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: request.params.id,
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      return reply.code(404).send({ error: 'Product not found' });
    }

    return {
      id: parseInt(product.id, 16) || 0,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      categoryId: parseInt(product.categoryId, 16) || 0,
      categoryName: product.category.name,
    };
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: 'Failed to fetch product' });
  }
}

