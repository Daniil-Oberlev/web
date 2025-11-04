export const ROUTES = {
  ROOT: '/',
  CATEGORIES: {
    BASE: '/api/categories',
    BY_ID: '/api/categories/:id',
  },
  PRODUCTS: {
    BASE: '/api/products',
    BY_ID: '/api/products/:id',
  },
} as const;
