import type { Category, Product } from '~/@types';

const API_BASE_URL = 'http://localhost:3000';

export interface ProductWithCategory extends Product {
  categoryId: number;
  categoryName: string;
}

/**
 * Fetch all categories with their products
 */
export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/api/categories`);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch all products from all categories
 */
export async function fetchProducts(): Promise<ProductWithCategory[]> {
  const response = await fetch(`${API_BASE_URL}/api/products`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch a single category by ID
 */
export async function fetchCategoryById(id: number): Promise<Category> {
  const response = await fetch(`${API_BASE_URL}/api/categories/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch category: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(
  id: number,
): Promise<ProductWithCategory> {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }
  return response.json();
}

