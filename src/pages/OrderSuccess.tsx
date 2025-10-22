import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Order } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find((o: Order) => o.id === orderId);
    setOrder(foundOrder || null);
  }, [orderId]);

  if (!order) {
    return (
      <div className="container py-16 px-4 text-center">
        <Icon name="AlertCircle" size={64} className="mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-2xl font-bold mb-2">Заказ не найден</h2>
        <Button onClick={() => navigate('/')} className="mt-4">
          Вернуться в магазин
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-16 px-4 max-w-2xl">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
            <Icon name="CheckCircle" size={32} className="text-green-500" />
          </div>
          <CardTitle className="text-3xl">Заказ успешно оформлен!</CardTitle>
          <CardDescription className="text-base">
            Номер вашего заказа: <span className="font-mono font-semibold">#{order.id}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Icon name="Mail" size={16} />
              <span>Подтверждение отправлено на {order.customerInfo.email}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Icon name="Package" size={16} />
              <span>Общая сумма: <span className="font-bold text-primary">{order.total.toLocaleString('ru-RU')} ₽</span></span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-muted-foreground">
              Мы начали обрабатывать ваш заказ. Вы можете отслеживать его статус в личном кабинете.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate('/orders')} size="lg">
              <Icon name="Package" size={18} className="mr-2" />
              Мои заказы
            </Button>
            <Button onClick={() => navigate('/')} variant="outline" size="lg">
              <Icon name="Store" size={18} className="mr-2" />
              В магазин
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
