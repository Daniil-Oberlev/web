import { useEffect, useState } from 'react';

import { createReview, fetchProductReviews, type Review } from '@/shared/api/reviews';
import { useAuth } from '@/shared/providers/AuthProvider';

import './index.css';

interface ReviewsProps {
  productId: string;
}

export const Reviews = ({ productId }: ReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProductReviews(productId);
      setReviews(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Не удалось загрузить отзывы',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Необходимо авторизоваться для оставления отзыва');
      return;
    }

    if (!comment.trim()) {
      setError('Пожалуйста, введите комментарий');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const newReview = await createReview({
        productId,
        rating,
        comment: comment.trim(),
      });
      setReviews([newReview, ...reviews]);
      setComment('');
      setRating(5);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Не удалось создать отзыв',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className='reviews-loading'>Загрузка отзывов...</div>;
  }

  return (
    <div className='reviews-container'>
      <h4 className='reviews-title'>Отзывы ({reviews.length})</h4>

      {user && (
        <form className='reviews-form' onSubmit={handleSubmit}>
          <div className='reviews-form-rating'>
            <label>Оценка:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={5}>5 - Отлично</option>
              <option value={4}>4 - Хорошо</option>
              <option value={3}>3 - Удовлетворительно</option>
              <option value={2}>2 - Плохо</option>
              <option value={1}>1 - Очень плохо</option>
            </select>
          </div>
          <textarea
            className='reviews-form-comment'
            placeholder='Оставьте ваш отзыв...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            required
          />
          <button
            type='submit'
            className='reviews-form-submit'
            disabled={submitting}
          >
            {submitting ? 'Отправка...' : 'Отправить отзыв'}
          </button>
        </form>
      )}

      {error && <div className='reviews-error'>{error}</div>}

      {reviews.length === 0 ? (
        <p className='reviews-empty'>Пока нет отзывов. Будьте первым!</p>
      ) : (
        <div className='reviews-list'>
          {reviews.map((review) => (
            <div key={review.id} className='review-item'>
              <div className='review-header'>
                <span className='review-user'>{review.userEmail}</span>
                <span className='review-rating'>
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </span>
                <span className='review-date'>
                  {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                </span>
              </div>
              <p className='review-comment'>{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

