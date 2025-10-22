import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export const BookingSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-16 px-4 max-w-2xl">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
            <Icon name="CheckCircle" size={32} className="text-green-500" />
          </div>
          <CardTitle className="text-3xl">Вы успешно записаны!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Icon name="Phone" size={16} />
              <span>Мы свяжемся с вами для подтверждения записи</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Icon name="Calendar" size={16} />
              <span>Ждем вас в назначенное время!</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-muted-foreground">
              Напоминание будет отправлено за день до визита. Если потребуется отменить или перенести запись, позвоните нам.
            </p>
            <div className="text-center">
              <a href="tel:+79991234567" className="text-primary hover:underline font-medium text-lg">
                +7 (999) 123-45-67
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate('/')} size="lg">
              <Icon name="Home" size={18} className="mr-2" />
              На главную
            </Button>
            <Button onClick={() => navigate('/shop')} variant="outline" size="lg">
              <Icon name="ShoppingBag" size={18} className="mr-2" />
              В магазин
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
