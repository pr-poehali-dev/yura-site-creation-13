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
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [currentServiceImage, setCurrentServiceImage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const serviceImages = [
    'https://cdn.poehali.dev/files/ece6e776-a586-4664-9796-edd65ef34279.jpg',
    'https://cdn.poehali.dev/files/75dfb668-4be5-48be-9fd4-da639ed5ad0d.jpg'
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      setCurrentServiceImage((prev) => (prev === serviceImages.length - 1 ? 0 : prev + 1));
    }
    if (touchStart - touchEnd < -75) {
      // Swipe right
      setCurrentServiceImage((prev) => (prev === 0 ? serviceImages.length - 1 : prev - 1));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-1 md:gap-2">
            <span className="text-lg md:text-2xl font-bold">ONE</span>
            <img 
              src="https://cdn.poehali.dev/files/7e9a3024-ca8a-4d76-af5f-23dbb82b0379.jpeg" 
              alt="Barber pole" 
              className="h-6 md:h-8 w-auto object-contain"
            />
            <span className="text-lg md:text-2xl font-bold">Barbershop</span>
          </div>
          <div className="hidden md:flex gap-8">
            <button onClick={() => setShowServicesModal(true)} className="hover:text-primary transition-colors">Услуги</button>
            <a href="#portfolio" className="hover:text-primary transition-colors">Работы</a>
            <a href="https://2gis.ru/vladivostok/firm/70000001080725498/tab/reviews" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Отзывы</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
          </div>
          <a href="https://wa.me/79841563771" target="_blank" rel="noopener noreferrer" className="text-primary font-medium flex items-center gap-2 text-sm md:text-base">
            <span className="hidden sm:inline">+7 (984) 156-37-71</span>
            <Icon name="Phone" size={20} className="sm:hidden" />
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
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold mb-4 md:mb-6 tracking-wider">
            <span className="block text-white">ONE</span>
            <span className="block text-primary">
              BARBERSHOP
            </span>
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl text-gray-300 mb-8 md:mb-12 font-light px-4">
            Мужской стиль в центре Владивостока
          </p>
          <Button 
            size="lg" 
            className="text-base sm:text-xl px-8 sm:px-12 py-6 sm:py-8 bg-primary hover:bg-primary/90 text-black font-bold tracking-wide"
            onClick={() => window.open('https://n1056280.yclients.com/', '_blank')}
          >
            ЗАПИСАТЬСЯ
          </Button>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 px-4 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-4 md:mb-6">
            <span className="text-primary">УСЛУГИ</span> И ЦЕНЫ
          </h2>
          <p className="text-center text-gray-400 mb-12 md:mb-16 text-base md:text-xl">Профессиональный уход для мужчин</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-zinc-800/50 border border-primary/20 hover:border-primary transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <Icon name={service.icon} size={32} className="text-primary sm:w-10 sm:h-10" />
                    <div className="text-right">
                      <div className="text-2xl md:text-3xl font-bold text-primary">{service.price}</div>
                      <div className="text-xs md:text-sm text-gray-400">руб</div>
                    </div>
                  </div>
                  <h3 className="text-base md:text-xl font-semibold text-white group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 md:mt-16">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-black font-bold text-base md:text-lg px-8 md:px-10 py-5 md:py-6"
              onClick={() => window.open('https://n1056280.yclients.com/', '_blank')}
            >
              ЗАПИСАТЬСЯ НА СТРИЖКУ
            </Button>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-16 md:py-24 px-4 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-4 md:mb-6">
            НАШИ <span className="text-primary">РАБОТЫ</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 md:mb-16 text-base md:text-xl">Примеры стрижек от наших мастеров</p>
          
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

      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-zinc-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6">
                О <span className="text-primary">БАРБЕРШОПЕ</span>
              </h2>
              <p className="text-base md:text-xl text-gray-300 mb-4 md:mb-6 leading-relaxed">
                ONEBarbershop — премиальный барбершоп в самом центре Владивостока. 
                Мы создаем стильные мужские образы уже более 5 лет.
              </p>
              <p className="text-sm md:text-lg text-gray-400 mb-6 md:mb-8 leading-relaxed">
                Наши мастера регулярно повышают квалификацию и следят за мировыми трендами. 
                Используем только профессиональную косметику и инструменты премиум-класса.
              </p>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="Award" size={20} className="text-primary md:w-6 md:h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-lg md:text-xl">8+ лет</div>
                    <div className="text-gray-400 text-sm md:text-base">опыта работы</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="Users" size={20} className="text-primary md:w-6 md:h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-lg md:text-xl">5000+</div>
                    <div className="text-gray-400 text-sm md:text-base">довольных клиентов</div>
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

      <section id="contacts" className="py-16 md:py-24 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-4 md:mb-6">
            <span className="text-primary">КОНТАКТЫ</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 md:mb-16 text-base md:text-xl">Запишитесь на удобное время</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <Card className="bg-zinc-900/50 border-primary/20">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-primary">ОНЛАЙН ЗАПИСЬ</h3>
                <form className="space-y-4 md:space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-white text-base md:text-lg mb-2 block">Ваше имя</Label>
                    <Input 
                      id="name"
                      placeholder="Введите имя"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="bg-black border-primary/30 text-white text-base md:text-lg py-5 md:py-6"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white text-base md:text-lg mb-2 block">Телефон</Label>
                    <Input 
                      id="phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="bg-black border-primary/30 text-white text-base md:text-lg py-5 md:py-6"
                    />
                  </div>
                  <Button 
                    type="button"
                    className="w-full bg-primary hover:bg-primary/90 text-black font-bold text-base md:text-lg py-5 md:py-6"
                    onClick={() => window.open('https://n1056280.yclients.com/', '_blank')}
                  >
                    ОТПРАВИТЬ ЗАЯВКУ
                  </Button>
                  <p className="text-xs md:text-sm text-gray-400 text-center">
                    Мы перезвоним вам в течение 15 минут
                  </p>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4 md:space-y-6">
              <Card className="bg-zinc-900/50 border-primary/20">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                    <Icon name="MapPin" size={24} className="text-primary flex-shrink-0 md:w-8 md:h-8" />
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">АДРЕС</h3>
                      <p className="text-gray-300 text-sm md:text-lg">ул. Адм.Фокина 9а, Владивосток</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                    <Icon name="Clock" size={24} className="text-primary flex-shrink-0 md:w-8 md:h-8" />
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">РЕЖИМ РАБОТЫ</h3>
                      <p className="text-gray-300 text-sm md:text-lg">Пн-Вс: 10:00 - 22:00</p>
                      <p className="text-gray-400 text-sm md:text-base">Без выходных</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <Icon name="Phone" size={24} className="text-primary flex-shrink-0 md:w-8 md:h-8" />
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">ТЕЛЕФОН</h3>
                      <a href="tel:+79841563771" className="text-primary text-sm md:text-lg hover:text-primary/80 transition-colors">
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

              <div className="flex gap-3 md:gap-4">
                <Button variant="outline" size="lg" className="flex-1 border-primary text-primary hover:bg-primary hover:text-black text-sm md:text-base py-5 md:py-6">
                  <Icon name="Instagram" size={20} className="mr-1 md:mr-2 md:w-6 md:h-6" />
                  <span className="hidden sm:inline">Instagram</span>
                </Button>
                <Button variant="outline" size="lg" className="flex-1 border-primary text-primary hover:bg-primary hover:text-black text-sm md:text-base py-5 md:py-6">
                  <Icon name="MessageCircle" size={20} className="mr-1 md:mr-2 md:w-6 md:h-6" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 md:py-8 px-4 bg-black border-t border-primary/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm md:text-base">
            © 2024 ONEBarbershop. Все права защищены.
          </p>
        </div>
      </footer>

      {showServicesModal && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
          onClick={() => setShowServicesModal(false)}
        >
          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowServicesModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
            >
              <Icon name="X" size={40} />
            </button>

            <div 
              className="relative touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={serviceImages[currentServiceImage]}
                alt="Прайс-лист услуг"
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg select-none"
                draggable={false}
              />

              {serviceImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentServiceImage((prev) => (prev === 0 ? serviceImages.length - 1 : prev - 1))}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-primary/90 text-white hover:text-black p-2 md:p-3 rounded-full transition-all"
                  >
                    <Icon name="ChevronLeft" size={24} className="md:w-8 md:h-8" />
                  </button>
                  <button
                    onClick={() => setCurrentServiceImage((prev) => (prev === serviceImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-primary/90 text-white hover:text-black p-2 md:p-3 rounded-full transition-all"
                  >
                    <Icon name="ChevronRight" size={24} className="md:w-8 md:h-8" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {serviceImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentServiceImage(index)}
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                          index === currentServiceImage ? 'bg-primary w-6 md:w-8' : 'bg-white/50 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="md:hidden absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full text-white text-sm">
                    Свайп для пролистывания
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 md:mt-6 text-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-black font-bold text-base md:text-xl px-8 md:px-12 py-5 md:py-6 w-full sm:w-auto"
                onClick={() => {
                  setShowServicesModal(false);
                  window.open('https://n1056280.yclients.com/', '_blank');
                }}
              >
                ЗАПИСАТЬСЯ СЕЙЧАС
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}