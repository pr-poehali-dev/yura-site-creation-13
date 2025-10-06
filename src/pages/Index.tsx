import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const services = [
  { title: 'Мужская стрижка', price: '2000', icon: 'Scissors' },
  { title: 'Бритье опасной бритвой', price: '1200', icon: 'Razor' },
  { title: 'Моделирование бороды', price: '800', icon: 'Sparkles' },
  { title: 'Детская стрижка', price: '1000', icon: 'Baby' },
  { title: 'Стрижка + борода', price: '2500', icon: 'Scissors' },
  { title: 'Камуфляж седины', price: '1500', icon: 'Droplet' }
];

const portfolio = [
  'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=600&fit=crop'
];

export default function Index() {
  const [form, setForm] = useState({ name: '', phone: '' });

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Scissors" size={28} className="text-primary" />
            <span className="text-2xl font-bold">ONEBARBERSHOP</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Работы</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
          </div>
          <a href="tel:+79841563771" className="text-primary font-medium">
            +7 (984) 156-37-71
          </a>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&h=1080&fit=crop')`,
            filter: 'brightness(0.7)'
          }}
        />
        
        <div className="relative z-20 text-center px-4 max-w-4xl animate-fade-in">
          <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-wider">
            <span className="block text-white">ONE</span>
            <span className="block bg-gradient-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent">
              BARBERSHOP
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-light">
            Мужской стиль в центре Владивостока
          </p>
          <Button 
            size="lg" 
            className="text-xl px-12 py-8 bg-primary hover:bg-primary/90 text-black font-bold tracking-wide"
            onClick={() => {
              if (typeof (window as any).yclientsWidget !== 'undefined') {
                (window as any).yclientsWidget.open();
              }
            }}
          >
            ЗАПИСАТЬСЯ
          </Button>
        </div>
      </section>

      <section id="services" className="py-24 px-4 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6">
            <span className="text-primary">УСЛУГИ</span> И ЦЕНЫ
          </h2>
          <p className="text-center text-gray-400 mb-16 text-xl">Профессиональный уход для мужчин</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-zinc-800/50 border border-primary/20 hover:border-primary transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <Icon name={service.icon} size={40} className="text-primary" />
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{service.price}</div>
                      <div className="text-sm text-gray-400">руб</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-black font-bold text-lg px-10 py-6"
              onClick={() => {
                if (typeof (window as any).yclientsWidget !== 'undefined') {
                  (window as any).yclientsWidget.open();
                }
              }}
            >
              ЗАПИСАТЬСЯ НА СТРИЖКУ
            </Button>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24 px-4 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6">
            НАШИ <span className="text-primary">РАБОТЫ</span>
          </h2>
          <p className="text-center text-gray-400 mb-16 text-xl">Примеры стрижек от наших мастеров</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {portfolio.map((img, index) => (
              <div 
                key={index} 
                className="aspect-square overflow-hidden relative group cursor-pointer"
              >
                <img 
                  src={img} 
                  alt={`Работа ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Icon name="ZoomIn" size={48} className="text-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-zinc-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                О <span className="text-primary">БАРБЕРШОПЕ</span>
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                ONEBarbershop — премиальный барбершоп в самом центре Владивостока. 
                Мы создаем стильные мужские образы уже более 5 лет.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Наши мастера регулярно повышают квалификацию и следят за мировыми трендами. 
                Используем только профессиональную косметику и инструменты премиум-класса.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="Award" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-xl">5+ лет</div>
                    <div className="text-gray-400">опыта работы</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="Users" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-xl">5000+</div>
                    <div className="text-gray-400">довольных клиентов</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="Star" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-xl">Топ-3</div>
                    <div className="text-gray-400">барбершопов города</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=800&h=800&fit=crop"
                  alt="Интерьер"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 border-4 border-primary rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-24 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6">
            <span className="text-primary">КОНТАКТЫ</span>
          </h2>
          <p className="text-center text-gray-400 mb-16 text-xl">Запишитесь на удобное время</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-zinc-900/50 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-primary">ОНЛАЙН ЗАПИСЬ</h3>
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-white text-lg mb-2 block">Ваше имя</Label>
                    <Input 
                      id="name"
                      placeholder="Введите имя"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="bg-black border-primary/30 text-white text-lg py-6"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white text-lg mb-2 block">Телефон</Label>
                    <Input 
                      id="phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="bg-black border-primary/30 text-white text-lg py-6"
                    />
                  </div>
                  <Button 
                    type="button"
                    className="w-full bg-primary hover:bg-primary/90 text-black font-bold text-lg py-6"
                    onClick={() => {
                      if (typeof (window as any).yclientsWidget !== 'undefined') {
                        (window as any).yclientsWidget.open();
                      }
                    }}
                  >
                    ОТПРАВИТЬ ЗАЯВКУ
                  </Button>
                  <p className="text-sm text-gray-400 text-center">
                    Мы перезвоним вам в течение 15 минут
                  </p>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-zinc-900/50 border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <Icon name="MapPin" size={32} className="text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">АДРЕС</h3>
                      <p className="text-gray-300 text-lg">ул. Адм.Фокина 9а, Владивосток</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 mb-6">
                    <Icon name="Clock" size={32} className="text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">РЕЖИМ РАБОТЫ</h3>
                      <p className="text-gray-300 text-lg">Пн-Вс: 10:00 - 21:00</p>
                      <p className="text-gray-400">Без выходных</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Phone" size={32} className="text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">ТЕЛЕФОН</h3>
                      <a href="tel:+79841563771" className="text-primary text-lg hover:text-primary/80 transition-colors">
                        +7 (984) 156-37-71
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="aspect-video w-full bg-zinc-800 rounded-lg overflow-hidden">
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?ll=131.885,43.115&z=16&pt=131.885,43.115,pm2rdm"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="w-full h-full"
                />
              </div>

              <div className="flex gap-4">
                <Button variant="outline" size="lg" className="flex-1 border-primary text-primary hover:bg-primary hover:text-black">
                  <Icon name="Instagram" size={24} className="mr-2" />
                  Instagram
                </Button>
                <Button variant="outline" size="lg" className="flex-1 border-primary text-primary hover:bg-primary hover:text-black">
                  <Icon name="MessageCircle" size={24} className="mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 bg-black border-t border-primary/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 ONEBarbershop. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}