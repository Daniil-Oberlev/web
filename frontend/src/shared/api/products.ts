import type { Category, Product } from '~/@types';

const API_BASE_URL = 'http://localhost:3000';

export interface ProductWithCategory extends Product {
  categoryId: number;
  categoryName: string;
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/api/categories`);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchProducts(): Promise<ProductWithCategory[]> {
  const response = await fetch(`${API_BASE_URL}/api/products`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchCategoryById(id: number): Promise<Category> {
  const response = await fetch(`${API_BASE_URL}/api/categories/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch category: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchProductById(
  id: number,
): Promise<ProductWithCategory> {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }
  return response.json();
}
