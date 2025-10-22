import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export const Home = () => {
  const services = [
    { 
      icon: 'Scissors', 
      title: 'Мужская стрижка', 
      description: 'Классические и современные стрижки от мастеров',
      price: '1500 ₽',
      duration: '45 мин'
    },
    { 
      icon: 'Sparkles', 
      title: 'Бритье опасной бритвой', 
      description: 'Традиционное бритье с горячим полотенцем',
      price: '1200 ₽',
      duration: '30 мин'
    },
    { 
      icon: 'Paintbrush', 
      title: 'Оформление бороды', 
      description: 'Моделирование и уход за бородой',
      price: '1000 ₽',
      duration: '30 мин'
    },
    { 
      icon: 'Flame', 
      title: 'Royal-комплекс', 
      description: 'Стрижка + бритье + уход за бородой',
      price: '3200 ₽',
      duration: '90 мин'
    }
  ];

  return (
    <div className="min-h-screen">
      <section 
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/aef054bb-8dfe-4ccb-911f-a363340f8f39.jpg')`
        }}
      >
        <div className="container px-4 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            BARBERSHOP
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Искусство мужского стиля и традиции классического бритья
          </p>
          <Button asChild size="lg" className="text-lg">
            <Link to="/booking">
              <Icon name="Calendar" size={20} className="mr-2" />
              Записаться на стрижку
            </Link>
          </Button>
        </div>
      </section>

      <section className="container py-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Наши услуги</h2>
          <p className="text-xl text-muted-foreground">
            Профессиональный уход от опытных барберов
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Icon name={service.icon as any} size={32} className="text-primary" />
                </div>
                <CardTitle className="text-center text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <CardDescription className="min-h-12">{service.description}</CardDescription>
                <div className="pt-4 border-t">
                  <div className="text-2xl font-bold text-primary mb-1">{service.price}</div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <Icon name="Clock" size={14} />
                    {service.duration}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/booking">
              <Icon name="Calendar" size={20} className="mr-2" />
              Записаться на услугу
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-secondary/50 py-20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-xl text-muted-foreground">
              Более 10 лет работы и тысячи довольных клиентов
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Icon name="Award" size={40} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Опытные мастера</h3>
              <p className="text-muted-foreground">
                Профессиональные барберы с многолетним опытом работы
              </p>
            </div>
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Icon name="Star" size={40} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Премиум качество</h3>
              <p className="text-muted-foreground">
                Используем только профессиональные средства и инструменты
              </p>
            </div>
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Icon name="Coffee" size={40} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Атмосфера комфорта</h3>
              <p className="text-muted-foreground">
                Уютный интерьер, кофе и приятная беседа
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary/10 py-20">
        <div className="container px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Готовы к новому образу?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Запишитесь на стрижку онлайн или позвоните нам
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/booking">
                <Icon name="Calendar" size={20} className="mr-2" />
                Записаться онлайн
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="tel:+79991234567">
                <Icon name="Phone" size={20} className="mr-2" />
                +7 (999) 123-45-67
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};