import React, { useEffect, useMemo, useState } from 'react';

import type { Product } from '~/@types';

import { useAuth } from './AuthProvider';
import { CartContext, type CartContextType, type CartItem } from './CartContext';

const createCartValue = (
  items: CartItem[],
  addItem: (product: Product) => void,
  removeItem: (productId: number) => void,
  clearCart: () => void,
): CartContextType => ({
  items,
  totalCount: items.reduce((sum, item) => sum + item.quantity, 0),
  addItem,
  removeItem,
  clearCart,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!user && items.length > 0) {
      setItems([]);
    }
  }, [user, items.length]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setItems([]);

  const value = useMemo<CartContextType>(
    () => createCartValue(items, addItem, removeItem, clearCart),
    [items],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};



