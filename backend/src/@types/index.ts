export interface Product {
  id: number;
  _id?: string;
  name: string;
  price: string;
  description: string;
  image: string;
  categoryId?: number;
  categoryName?: string;
}

export interface Category {
  id: number;
  _id?: string;
  name: string;
  products: Product[];
}

export interface ApiError {
  error: string;
}

export interface GetCategoryParams {
  id: string;
}

export interface GetProductParams {
  id: string;
}

