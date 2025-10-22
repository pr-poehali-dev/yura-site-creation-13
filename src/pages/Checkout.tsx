import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Order } from '@/types';

export const Checkout = () => {
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    paymentMethod: 'card'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!user) {
      toast.error('Необходима авторизация');
      navigate('/login');
      return;
    }

    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Введите корректный номер телефона');
      setIsSubmitting(false);
      return;
    }

    const order: Order = {
      id: Date.now().toString(),
      userId: user.id,
      items: cart,
      total,
      date: new Date().toISOString(),
      status: 'paid',
      customerInfo: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address || undefined
      }
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    clearCart();
    toast.success('Заказ успешно оформлен!');
    navigate(`/order-success/${order.id}`);
  };

  return (
    <div className="container py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Оформление заказа</h1>
        <p className="text-muted-foreground">Заполните данные для доставки и оплаты</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" size={20} />
                  Контактная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Адрес доставки (необязательно)</Label>
                  <Input
                    id="address"
                    placeholder="г. Москва, ул. Примерная, д. 1"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="CreditCard" size={20} />
                  Способ оплаты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                      <Icon name="CreditCard" size={18} />
                      <span>Банковская карта</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer">
                      <Icon name="Banknote" size={18} />
                      <span>Наличные при получении</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="sbp" id="sbp" />
                    <Label htmlFor="sbp" className="flex items-center gap-2 cursor-pointer">
                      <Icon name="Smartphone" size={18} />
                      <span>СБП (Система быстрых платежей)</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Ваш заказ</CardTitle>
                <CardDescription>{cart.length} товаров</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded bg-secondary overflow-hidden flex-shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">{item.quantity} × {item.product.price.toLocaleString('ru-RU')} ₽</p>
                      </div>
                      <div className="text-sm font-medium">
                        {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Товары</span>
                    <span className="font-medium">{total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Доставка</span>
                    <span className="font-medium text-green-500">Бесплатно</span>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Итого</span>
                  <span className="text-2xl font-bold text-primary">{total.toLocaleString('ru-RU')} ₽</span>
                </div>
              </CardContent>
              <CardContent className="pt-0">
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  <Icon name="Check" size={18} className="mr-2" />
                  {isSubmitting ? 'Оформление...' : 'Оплатить заказ'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};
