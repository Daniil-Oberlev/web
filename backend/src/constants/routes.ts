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
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
  },
} as const;
