import '../index.css';

import { useAuth } from '@/shared/providers/AuthProvider';
import { useCart } from '@/shared/providers/useCart';

export const Cart = () => {
  const { user } = useAuth();
  const { items, totalCount, removeItem, clearCart } = useCart();

  if (!user) {
    return (
      <main className='content'>
        <p>Корзина доступна только для авторизованных пользователей.</p>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className='content'>
        <h2 className='content__header'>Ваша корзина пуста</h2>
        <p>Перейдите в каталог, чтобы добавить товары.</p>
      </main>
    );
  }

  return (
    <main className='content'>
      <h2 className='content__header'>Ваша корзина</h2>
      <p>Товаров в корзине: {totalCount}</p>
      <div>
        {items.map(({ product, quantity }) => (
          <div key={product.id} className='product-card'>
            <img
              src={product.image}
              alt={product.name}
              className='product-image'
              width={120}
              height={90}
            />
            <h4 className='product-name'>{product.name}</h4>
            <p className='product-description'>{product.description}</p>
            <div className='product-price'>{product.price}</div>
            <div>Количество: {quantity}</div>
            <button
              className='product-button'
              onClick={() => removeItem(product.id)}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
      <button className='product-button' onClick={clearCart}>
        Очистить корзину
      </button>
    </main>
  );
};


