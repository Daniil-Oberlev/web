const API_BASE_URL = 'http://localhost:3000';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  userEmail: string;
  createdAt: string;
}

export interface CreateReviewData {
  productId: string;
  rating: number;
  comment: string;
}

export async function fetchProductReviews(
  productId: string,
): Promise<Review[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/reviews/product/${productId}`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch reviews: ${response.statusText}`);
  }
  return response.json();
}

export async function createReview(
  data: CreateReviewData,
): Promise<Review> {
  const response = await fetch(`${API_BASE_URL}/api/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create review');
  }
  return response.json();
}

