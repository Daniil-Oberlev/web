import '../index.css';

import { useState } from 'react';

import { useAuth } from '@/shared/providers/AuthProvider';
import { useCart } from '@/shared/providers/useCart';

import './index.css';

export const Cart = () => {
  const { user } = useAuth();
  const { items, totalCount, removeItem, updateQuantity, clearCart } = useCart();

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
      <div className='cart-items'>
        {items.map(({ product, quantity }) => (
          <CartItem
            key={product.id}
            product={product}
            quantity={quantity}
            onUpdateQuantity={(newQuantity) =>
              updateQuantity(product.id, newQuantity)
            }
            onRemove={() => removeItem(product.id)}
          />
        ))}
      </div>
      <div className='cart-actions'>
        <button className='cart-button cart-button-clear' onClick={clearCart}>
          Очистить корзину
        </button>
      </div>
    </main>
  );
};

interface CartItemProps {
  product: {
    id: number;
    name: string;
    description: string;
    image: string;
    price: string;
  };
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

const CartItem = ({
  product,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) => {
  const [inputValue, setInputValue] = useState(quantity.toString());

  const handleQuantityChange = (newValue: string) => {
    setInputValue(newValue);
    const numValue = parseInt(newValue, 10);
    if (!isNaN(numValue) && numValue > 0) {
      onUpdateQuantity(numValue);
    }
  };

  const handleBlur = () => {
    const numValue = parseInt(inputValue, 10);
    if (isNaN(numValue) || numValue <= 0) {
      setInputValue(quantity.toString());
    } else {
      onUpdateQuantity(numValue);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setInputValue(newQuantity.toString());
      onUpdateQuantity(newQuantity);
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setInputValue(newQuantity.toString());
    onUpdateQuantity(newQuantity);
  };

  return (
    <div className='cart-item'>
      <img
        src={product.image}
        alt={product.name}
        className='cart-item-image'
        width={120}
        height={90}
      />
      <div className='cart-item-info'>
        <h4 className='cart-item-name'>{product.name}</h4>
        <p className='cart-item-description'>{product.description}</p>
        <div className='cart-item-price'>{product.price}</div>
      </div>
      <div className='cart-item-controls'>
        <div className='cart-item-quantity'>
          <button
            className='cart-quantity-button'
            onClick={handleDecrease}
            disabled={quantity <= 1}
          >
            −
          </button>
          <input
            type='number'
            min='1'
            value={inputValue}
            onChange={(e) => handleQuantityChange(e.target.value)}
            onBlur={handleBlur}
            className='cart-quantity-input'
          />
          <button className='cart-quantity-button' onClick={handleIncrease}>
            +
          </button>
        </div>
        <button className='cart-item-remove' onClick={onRemove}>
          Удалить
        </button>
      </div>
    </div>
  );
};


