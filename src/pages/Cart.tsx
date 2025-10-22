import { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { analytics } from '@/lib/analytics';

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  useEffect(() => {
    analytics.trackPageView('/cart');
    if (items.length > 0) {
      analytics.trackPurchaseIntent();
    }
  }, [items.length]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <Icon name="ShoppingCart" size={64} className="mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
          <p className="text-muted-foreground mb-6">
            Добавьте товары из каталога
          </p>
          <Button asChild size="lg">
            <Link to="/shop">
              <Icon name="Store" size={20} className="mr-2" />
              Перейти в магазин
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Корзина</h1>
          <Button variant="outline" onClick={clearCart}>
            <Icon name="Trash2" size={18} className="mr-2" />
            Очистить корзину
          </Button>
        </div>

        <div className="space-y-4 mb-8">
          {items.map(({ product, quantity }) => (
            <Card key={product.id}>
              <CardContent className="flex gap-4 p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                      >
                        <Icon name="Minus" size={16} />
                      </Button>
                      <span className="w-8 text-center font-medium">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                      >
                        <Icon name="Plus" size={16} />
                      </Button>
                    </div>
                    <span className="font-bold text-lg">
                      {product.price * quantity} ₽
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(product.id)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-muted/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between text-2xl font-bold mb-4">
              <span>Итого:</span>
              <span>{totalPrice} ₽</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Для оформления заказа свяжитесь с нами по телефону или в соцсетях
            </p>
            <Button size="lg" className="w-full" asChild>
              <Link to="/">
                <Icon name="Home" size={20} className="mr-2" />
                На главную
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};