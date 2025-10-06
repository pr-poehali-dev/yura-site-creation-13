import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const services = [
  {
    title: 'Мужская стрижка',
    price: 'от 2000₽',
    description: 'Классическая или модельная стрижка от профессиональных мастеров',
    icon: 'Scissors'
  },
  {
    title: 'Бритье опасной бритвой',
    price: 'от 1200₽',
    description: 'Традиционное бритье горячим полотенцем и опасной бритвой',
    icon: 'Waves'
  },
  {
    title: 'Моделирование бороды',
    price: 'от 800₽',
    description: 'Стрижка и оформление бороды и усов с укладкой',
    icon: 'Crown'
  },
  {
    title: 'Стрижка + Бритье',
    price: 'от 2200₽',
    description: 'Комплексный уход: стрижка волос и бритье с полным сервисом',
    icon: 'Star'
  }
];

const masters = [
  { name: 'Андрей', experience: '8 лет' },
  { name: 'Дмитрий', experience: '5 лет' },
  { name: 'Максим', experience: '6 лет' }
];

const reviews = [
  {
    name: 'Александр',
    rating: 5,
    text: 'Отличный барбершоп! Мастера настоящие профессионалы. Всегда выхожу довольным.',
    date: '15.09.2024'
  },
  {
    name: 'Михаил',
    rating: 5,
    text: 'Лучшее бритье опасной бритвой во Владивостоке. Атмосфера премиальная, сервис на высоте.',
    date: '22.09.2024'
  },
  {
    name: 'Денис',
    rating: 5,
    text: 'Хожу сюда уже 2 года. Андрей делает идеальные стрижки, всегда учитывает пожелания.',
    date: '01.10.2024'
  }
];

export default function Index() {
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    service: '',
    master: '',
    date: '',
    time: ''
  });

  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    phone: '',
    message: ''
  });

  return (
    <div className="min-h-screen bg-black">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&h=1080&fit=crop')` }}
        />
        
        <div className="relative z-20 text-center px-4 animate-fade-in">
          <div className="mb-8">
            <Icon name="Crown" size={64} className="mx-auto text-primary mb-4" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-yellow-400 to-primary bg-clip-text text-transparent">
            ONEBARBERSHOP
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Премиальный барбершоп во Владивостоке
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-black font-semibold"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Записаться онлайн
            </Button>
            <a href="tel:+79841563771" className="text-primary hover:text-primary/80 transition-colors text-lg font-medium">
              <Icon name="Phone" size={20} className="inline mr-2" />
              +7 (984) 156-37-71
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-primary" />
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Наши Услуги</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Профессиональный уход для настоящих мужчин</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="bg-card border-border hover:border-primary transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-2xl text-primary">{service.title}</CardTitle>
                  <CardDescription className="text-xl font-bold text-primary/90">{service.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">О нас</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Мастерство и стиль в каждой детали</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=600&h=600&fit=crop" 
                alt="Интерьер барбершопа"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=600&fit=crop" 
                alt="Работа мастера"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=600&fit=crop" 
                alt="Результат работы"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 max-w-3xl mx-auto">
            <p className="text-lg text-foreground leading-relaxed">
              ONEBarbershop — это место, где мужской стиль встречается с профессионализмом. 
              Наши мастера прошли обучение в лучших барбер-академиях и регулярно повышают квалификацию. 
              Мы используем только премиальную косметику и инструменты для создания вашего идеального образа.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Отзывы клиентов</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Что говорят о нас</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl text-primary">{review.name}</CardTitle>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-primary fill-primary" />
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground">{review.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Онлайн запись</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">Выберите удобное время</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Форма записи</CardTitle>
                <CardDescription>Заполните форму, и мы свяжемся с вами для подтверждения</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input 
                    id="name"
                    placeholder="Ваше имя"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input 
                    id="phone"
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="service">Услуга</Label>
                  <Select value={bookingForm.service} onValueChange={(value) => setBookingForm({ ...bookingForm, service: value })}>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service, index) => (
                        <SelectItem key={index} value={service.title}>{service.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="master">Мастер</Label>
                  <Select value={bookingForm.master} onValueChange={(value) => setBookingForm({ ...bookingForm, master: value })}>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Выберите мастера" />
                    </SelectTrigger>
                    <SelectContent>
                      {masters.map((master, index) => (
                        <SelectItem key={index} value={master.name}>
                          {master.name} ({master.experience})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Дата</Label>
                    <Input 
                      id="date"
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Время</Label>
                    <Input 
                      id="time"
                      type="time"
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-black font-semibold">
                  Записаться
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    <Icon name="MapPin" size={24} />
                    Наш адрес
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg text-foreground">ул. Адм.Фокина 9а, Владивосток</p>
                  <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
                    <iframe 
                      src="https://yandex.ru/map-widget/v1/?ll=131.885,43.115&z=16&pt=131.885,43.115,pm2rdm"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      className="w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    <Icon name="Clock" size={24} />
                    Время работы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-foreground font-medium">Пн-Вс: 10:00 - 21:00</p>
                  <p className="text-muted-foreground mt-2">Без выходных</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    <Icon name="Phone" size={24} />
                    Контакты
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <a href="tel:+79841563771" className="text-lg text-foreground hover:text-primary transition-colors block">
                    +7 (984) 156-37-71
                  </a>
                  <div className="flex gap-4 mt-4">
                    <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary hover:text-black">
                      <Icon name="Instagram" size={20} />
                    </Button>
                    <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary hover:text-black">
                      <Icon name="MessageCircle" size={20} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Обратная связь</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Оставьте ваше сообщение</p>
          
          <Card className="bg-card border-border">
            <CardContent className="pt-6 space-y-4">
              <div>
                <Label htmlFor="feedback-name">Имя</Label>
                <Input 
                  id="feedback-name"
                  placeholder="Ваше имя"
                  value={feedbackForm.name}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="feedback-phone">Телефон</Label>
                <Input 
                  id="feedback-phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={feedbackForm.phone}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, phone: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="feedback-message">Сообщение</Label>
                <Textarea 
                  id="feedback-message"
                  placeholder="Ваше сообщение или вопрос"
                  rows={5}
                  value={feedbackForm.message}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                  className="bg-input border-border text-foreground resize-none"
                />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-black font-semibold">
                Отправить
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 bg-black border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Crown" size={32} className="text-primary" />
            <h3 className="text-2xl font-bold text-primary">ONEBARBERSHOP</h3>
          </div>
          <p className="text-muted-foreground mb-4">Премиальный барбершоп во Владивостоке</p>
          <p className="text-sm text-muted-foreground">
            © 2024 ONEBarbershop. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}
