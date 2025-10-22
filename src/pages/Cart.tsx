import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Войдите в аккаунт для оформления заказа');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="container py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Корзина</h1>
        <p className="text-muted-foreground">Просмотрите и измените товары перед оформлением</p>
      </div>

      {cart.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Icon name="ShoppingCart" size={64} className="mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
            <p className="text-muted-foreground mb-6">Добавьте товары из каталога</p>
            <Button onClick={() => navigate('/')}>
              <Icon name="Store" size={18} className="mr-2" />
              Перейти в каталог
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{item.product.description}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-2 border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Icon name="Minus" size={16} />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Icon name="Plus" size={16} />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Icon name="Trash2" size={16} className="mr-1" />
                          Удалить
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">
                        {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.product.price.toLocaleString('ru-RU')} ₽ / шт
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Итого</CardTitle>
                <CardDescription>Сводка заказа</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Товары ({cart.reduce((sum, item) => sum + item.quantity, 0)} шт)</span>
                    <span className="font-medium">{total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Доставка</span>
                    <span className="font-medium text-green-500">Бесплатно</span>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Всего</span>
                  <span className="text-2xl font-bold text-primary">{total.toLocaleString('ru-RU')} ₽</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button onClick={handleCheckout} className="w-full" size="lg">
                  <Icon name="CreditCard" size={18} className="mr-2" />
                  Оформить заказ
                </Button>
                <Button variant="outline" onClick={() => navigate('/')} className="w-full">
                  <Icon name="ArrowLeft" size={18} className="mr-2" />
                  Продолжить покупки
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
