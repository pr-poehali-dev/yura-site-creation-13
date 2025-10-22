import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

export const Booking = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });

  const services = [
    { value: 'haircut', label: 'Мужская стрижка - 1500 ₽', duration: 45 },
    { value: 'shave', label: 'Бритье опасной бритвой - 1200 ₽', duration: 30 },
    { value: 'beard', label: 'Оформление бороды - 1000 ₽', duration: 30 },
    { value: 'royal', label: 'Royal-комплекс - 3200 ₽', duration: 90 }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.service || !formData.date || !formData.time) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Введите корректный номер телефона');
      return;
    }

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = {
      id: Date.now().toString(),
      userId: user?.id || null,
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    toast.success('Запись успешно создана!');
    navigate('/booking-success');
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Онлайн-запись</h1>
          <p className="text-muted-foreground">Выберите услугу, дату и время посещения</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calendar" size={20} />
                  Данные для записи
                </CardTitle>
                <CardDescription>
                  {!isAuthenticated && 'Войдите в аккаунт или заполните данные как гость'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Иван Иванов"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Выберите услугу *</Label>
                    <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Дата *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                        min={minDate}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Время *</Label>
                      <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите время" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Icon name="Check" size={18} className="mr-2" />
                    Подтвердить запись
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Info" size={20} />
                  Информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-2">
                  <Icon name="MapPin" size={18} className="text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Адрес</div>
                    <div className="text-muted-foreground">г. Москва, ул. Примерная, 1</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Clock" size={18} className="text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Режим работы</div>
                    <div className="text-muted-foreground">Пн-Вс: 09:00 - 21:00</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Phone" size={18} className="text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Телефон</div>
                    <div className="text-muted-foreground">+7 (999) 123-45-67</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="AlertCircle" size={20} />
                  Важно знать
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Запись действительна в течение 15 минут после выбранного времени</p>
                <p>• Для отмены записи позвоните нам заранее</p>
                <p>• При опоздании более 15 минут запись аннулируется</p>
                <p>• Мы принимаем наличные и банковские карты</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
