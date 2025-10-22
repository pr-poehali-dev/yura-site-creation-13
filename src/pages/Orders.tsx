import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Order } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export const Orders = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = allOrders.filter((order: Order) => order.userId === user?.id);
    setOrders(userOrders);
  }, [isAuthenticated, navigate, user]);

  const getStatusBadge = (status: Order['status']) => {
    const variants: Record<Order['status'], { label: string; className: string }> = {
      paid: { label: 'Оплачено', className: 'bg-green-500/20 text-green-400 border-green-500/50' },
      processing: { label: 'В процессе', className: 'bg-blue-500/20 text-blue-400 border-blue-500/50' },
      delivered: { label: 'Доставлено', className: 'bg-purple-500/20 text-purple-400 border-purple-500/50' },
    };
    
    return (
      <Badge variant="outline" className={variants[status].className}>
        {variants[status].label}
      </Badge>
    );
  };

  return (
    <div className="container py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">История заказов</h1>
        <p className="text-muted-foreground">Отслеживайте статус ваших заказов</p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Icon name="Package" size={64} className="mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">У вас пока нет заказов</h3>
            <p className="text-muted-foreground mb-6">Начните делать покупки в нашем магазине</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Заказ #{order.id}
                      {getStatusBadge(order.status)}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Icon name="Calendar" size={14} />
                      {new Date(order.date).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {order.total.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Separator />
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Package" size={16} />
                    Товары в заказе
                  </h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="User" size={16} />
                    Информация о получателе
                  </h4>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Имя:</span>
                      <span className="font-medium">{order.customerInfo.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{order.customerInfo.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Телефон:</span>
                      <span className="font-medium">{order.customerInfo.phone}</span>
                    </div>
                    {order.customerInfo.address && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Адрес:</span>
                        <span className="font-medium">{order.customerInfo.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
