import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types/shop';
import { useToast } from '@/hooks/use-toast';
import { analytics } from '@/lib/analytics';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product) => {
    analytics.trackAddToCart(product.id, product.name, product.price);
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        toast({
          title: "Товар обновлен",
          description: `${product.name} - количество увеличено`,
        });
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast({
        title: "Добавлено в корзину",
        description: product.name,
      });
      return [...current, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    const item = items.find((i) => i.product.id === productId);
    if (item) {
      analytics.trackRemoveFromCart(item.product.id, item.product.name);
    }
    setItems((current) => current.filter((item) => item.product.id !== productId));
    toast({
      title: "Удалено из корзины",
      variant: "destructive",
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Корзина очищена",
    });
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};