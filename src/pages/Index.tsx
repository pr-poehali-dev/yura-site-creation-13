import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const services = [
  { title: 'Мужская стрижка', titleEn: 'Men\'s Haircut', price: '2000', icon: 'Scissors' },
  { title: 'Бритье опасной бритвой', titleEn: 'Straight Razor Shave', price: '1200', icon: 'Razor' },
  { title: 'Моделирование бороды', titleEn: 'Beard Styling', price: '800', icon: 'Sparkles' },
  { title: 'Детская стрижка', titleEn: 'Kids Haircut', price: '1000', icon: 'Baby' },
  { title: 'Стрижка + борода', titleEn: 'Haircut + Beard', price: '2500', icon: 'Scissors' },
  { title: 'Камуфляж седины', titleEn: 'Gray Hair Camouflage', price: '1500', icon: 'Droplet' }
];

const portfolio = [
  'https://cdn.poehali.dev/files/ce0c28cc-4c9f-4458-8226-5758e5845bf1.jpeg',
  'https://cdn.poehali.dev/files/643a0e25-fc8f-434a-93da-9ea8af6779be.jpeg',
  'https://cdn.poehali.dev/files/2a4f1bd0-cff9-4675-a942-018c8caf9a77.jpg',
  'https://cdn.poehali.dev/files/35218bc4-cfc8-41e6-b80e-803e18488bcd.png',
  'https://cdn.poehali.dev/files/d7a8b9a6-45ba-4af5-8cc8-9f36f3c275a2.jpg',
  'https://cdn.poehali.dev/files/fdc339eb-0940-4122-bfe4-e307a2ae3f4c.jpg',
  'https://cdn.poehali.dev/files/7bfe7385-960f-493f-8f89-5d85b50f272c.jpg',
  'https://cdn.poehali.dev/files/a165977f-776f-4a0e-9f44-aa54bc678042.jpg',
  'https://cdn.poehali.dev/files/fd86673a-8ce6-46c7-a665-2cbc5df0113a.jpg'
];

export default function Index() {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [currentServiceImage, setCurrentServiceImage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [galleryTouchStart, setGalleryTouchStart] = useState(0);
  const [galleryTouchEnd, setGalleryTouchEnd] = useState(0);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const heroImages = [
    'https://cdn.poehali.dev/files/4018c35d-956e-4537-9bb3-0ba30a5e2f6d.jpg',
    'https://cdn.poehali.dev/files/3d497016-0b5d-48f5-a121-2ea137d78be7.jpg',
    'https://cdn.poehali.dev/files/0b2a8854-623b-45b5-9a65-5eee671db493.jpg',
    'https://cdn.poehali.dev/files/cc4fc154-d79c-465b-a07b-25339ad95857.jpg'
  ];

  const serviceImages = [
    'https://cdn.poehali.dev/files/ece6e776-a586-4664-9796-edd65ef34279.jpg'
  ];

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      setCurrentServiceImage((prev) => (prev === serviceImages.length - 1 ? 0 : prev + 1));
    }
    if (touchStart - touchEnd < -75) {
      setCurrentServiceImage((prev) => (prev === 0 ? serviceImages.length - 1 : prev - 1));
    }
  };

  const handleGalleryTouchStart = (e: React.TouchEvent) => {
    setGalleryTouchStart(e.targetTouches[0].clientX);
  };

  const handleGalleryTouchMove = (e: React.TouchEvent) => {
    setGalleryTouchEnd(e.targetTouches[0].clientX);
  };

  const handleGalleryTouchEnd = () => {
    if (galleryTouchStart - galleryTouchEnd > 75) {
      setSelectedImage((prev) => prev !== null ? (prev === portfolio.length - 1 ? 0 : prev + 1) : null);
    }
    if (galleryTouchStart - galleryTouchEnd < -75) {
      setSelectedImage((prev) => prev !== null ? (prev === 0 ? portfolio.length - 1 : prev - 1) : null);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceImage((prev) => (prev === serviceImages.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [serviceImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Global smoke effect across entire page */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`global-smoke global-smoke-${i + 1}`}></div>
        ))}
      </div>
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
            <button onClick={() => setShowServicesModal(true)} className="hover:text-primary transition-colors">{language === 'ru' ? 'Услуги' : 'Services'}</button>
            <a href="#portfolio" className="hover:text-primary transition-colors">{language === 'ru' ? 'Работы' : 'Portfolio'}</a>
            <button onClick={() => setShowReviewsModal(true)} className="hover:text-primary transition-colors">{language === 'ru' ? 'Отзывы' : 'Reviews'}</button>
            <a href="#contacts" className="hover:text-primary transition-colors">{language === 'ru' ? 'Контакты' : 'Contacts'}</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
              className="text-white hover:text-primary transition-colors font-medium text-sm md:text-base"
            >
              {language === 'ru' ? 'EN' : 'RU'}
            </button>
            <a href="https://wa.me/79841563771" target="_blank" rel="noopener noreferrer" className="text-primary font-medium flex items-center gap-2 text-sm md:text-base">
              <span className="hidden sm:inline">+7 (984) 156-37-71</span>
              <Icon name="Phone" size={20} className="sm:hidden" />
            </a>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-white hover:text-primary transition-colors"
            >
              <Icon name={showMobileMenu ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </nav>

      {showMobileMenu && (
        <>
          <div 
            className="fixed inset-0 z-30 md:hidden" 
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="fixed top-[60px] left-0 right-0 bg-black/95 backdrop-blur-md z-40 border-b border-primary/20 md:hidden animate-slide-down">
            <div className="flex flex-col p-4 gap-4">
            <button 
              onClick={() => {
                setShowServicesModal(true);
                setShowMobileMenu(false);
              }} 
              className="text-left hover:text-primary transition-colors py-2"
            >
              {language === 'ru' ? 'Услуги' : 'Services'}
            </button>
            <a 
              href="#portfolio" 
              className="hover:text-primary transition-colors py-2"
              onClick={() => setShowMobileMenu(false)}
            >
              {language === 'ru' ? 'Работы' : 'Portfolio'}
            </a>
            <button 
              onClick={() => {
                setShowReviewsModal(true);
                setShowMobileMenu(false);
              }} 
              className="text-left hover:text-primary transition-colors py-2"
            >
              {language === 'ru' ? 'Отзывы' : 'Reviews'}
            </button>
            <a 
              href="#contacts" 
              className="hover:text-primary transition-colors py-2"
              onClick={() => setShowMobileMenu(false)}
            >
              {language === 'ru' ? 'Контакты' : 'Contacts'}
            </a>
          </div>
        </div>
        </>
      )}

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentHeroImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${img}')`,
              filter: 'brightness(0.4)'
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black z-10" />
        
        {/* Smoke effect */}
        <div className="absolute inset-0 z-15">
          <div className="smoke smoke-1"></div>
          <div className="smoke smoke-2"></div>
          <div className="smoke smoke-3"></div>
          <div className="smoke smoke-4"></div>
          <div className="smoke smoke-5"></div>
          <div className="smoke smoke-6"></div>
          <div className="smoke smoke-7"></div>
          <div className="smoke smoke-8"></div>
        </div>
        
        {/* Sparks effect */}
        <div className="absolute inset-0 z-15 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div key={i} className={`spark spark-${i + 1}`}></div>
          ))}
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl animate-fade-in">
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold mb-4 md:mb-6 tracking-wider">
            <span className="block text-white">ONE</span>
            <span className="block text-primary">
              BARBERSHOP
            </span>
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl text-gray-300 mb-8 md:mb-12 font-light px-4">
            {language === 'ru' ? 'Мужской стиль в центре Владивостока' : 'Men\'s Style in the Heart of Vladivostok'}
          </p>
          <Button 
            size="lg" 
            className="text-base sm:text-xl px-8 sm:px-12 py-6 sm:py-8 bg-primary hover:bg-primary/90 text-black font-bold tracking-wide"
            onClick={() => window.open('https://n1056280.yclients.com/', '_blank')}
          >
            {language === 'ru' ? 'ЗАПИСАТЬСЯ' : 'BOOK NOW'}
          </Button>
        </div>
      </section>

      <section id="portfolio" className="py-16 md:py-24 px-4 bg-gradient-to-b from-black to-zinc-900 fade-in-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-4 md:mb-6">
            {language === 'ru' ? 'НАШИ' : 'OUR'} <span className="text-primary">{language === 'ru' ? 'РАБОТЫ' : 'WORK'}</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 md:mb-16 text-base md:text-xl">{language === 'ru' ? 'Примеры стрижек от наших мастеров' : 'Haircuts from Our Masters'}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {portfolio.map((img, index) => (
              <div 
                key={index} 
                className="aspect-square overflow-hidden relative group cursor-pointer fade-in-section"
                style={{ transitionDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedImage(index)}
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

      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-zinc-900 to-black fade-in-section">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="fade-in-section">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6">
                {language === 'ru' ? 'О' : 'ABOUT'} <span className="text-primary">{language === 'ru' ? 'БАРБЕРШОПЕ' : 'BARBERSHOP'}</span>
              </h2>
              <p className="text-base md:text-xl text-gray-300 mb-4 md:mb-6 leading-relaxed">
                {language === 'ru' ? 'ONEBarbershop — премиальный барбершоп в самом центре Владивостока. Мы создаем стильные мужские образы уже более 5 лет.' : 'ONEBarbershop is a premium barbershop in the heart of Vladivostok. We have been creating stylish men\'s looks for over 5 years.'}
              </p>
              <p className="text-sm md:text-lg text-gray-400 mb-6 md:mb-8 leading-relaxed">
                {language === 'ru' ? 'Наши мастера регулярно повышают квалификацию и следят за мировыми трендами. Используем только профессиональную косметику и инструменты премиум-класса.' : 'Our masters regularly improve their skills and follow global trends. We use only professional cosmetics and premium-class tools.'}
              </p>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="Award" size={20} className="text-primary md:w-6 md:h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-lg md:text-xl">{language === 'ru' ? '8+ лет' : '8+ years'}</div>
                    <div className="text-gray-400 text-sm md:text-base">{language === 'ru' ? 'опыта работы' : 'of experience'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="Users" size={20} className="text-primary md:w-6 md:h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-lg md:text-xl">5000+</div>
                    <div className="text-gray-400 text-sm md:text-base">{language === 'ru' ? 'довольных клиентов' : 'satisfied clients'}</div>
                  </div>
                </div>

              </div>
            </div>
            <div className="relative fade-in-section">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/files/f5705108-be0d-4eaf-a288-50c26571ee22.jpg"
                  alt="Интерьер барбершопа"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 border-4 border-primary rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 md:py-24 px-4 bg-black fade-in-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-4 md:mb-6">
            <span className="text-primary">{language === 'ru' ? 'КОНТАКТЫ' : 'CONTACTS'}</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 md:mb-16 text-base md:text-xl">{language === 'ru' ? 'Запишитесь на удобное время' : 'Book a Convenient Time'}</p>
          
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
              <Card className="bg-zinc-900/50 border-primary/20 fade-in-section">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                    <Icon name="MapPin" size={24} className="text-primary flex-shrink-0 md:w-8 md:h-8" />
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{language === 'ru' ? 'АДРЕС' : 'ADDRESS'}</h3>
                      <p className="text-gray-300 text-sm md:text-lg">{language === 'ru' ? 'ул. Адм.Фокина 9а, Владивосток' : '9a Admiral Fokina St, Vladivostok'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                    <Icon name="Clock" size={24} className="text-primary flex-shrink-0 md:w-8 md:h-8" />
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{language === 'ru' ? 'РЕЖИМ РАБОТЫ' : 'WORKING HOURS'}</h3>
                      <p className="text-gray-300 text-sm md:text-lg">{language === 'ru' ? 'Пн-Вс: 10:00 - 22:00' : 'Mon-Sun: 10:00 - 22:00'}</p>
                      <p className="text-gray-400 text-sm md:text-base">{language === 'ru' ? 'Без выходных' : 'No days off'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 md:gap-4">
                    <Icon name="Phone" size={24} className="text-primary flex-shrink-0 md:w-8 md:h-8" />
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{language === 'ru' ? 'ТЕЛЕФОН' : 'PHONE'}</h3>
                      <a href="tel:+79841563771" className="text-primary text-sm md:text-lg hover:text-primary/80 transition-colors">
                        +7 (984) 156-37-71
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="aspect-video w-full bg-zinc-800 rounded-lg overflow-hidden fade-in-section">
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?ll=131.885,43.115&z=16&pt=131.885,43.115,pm2rdm"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="w-full h-full"
                />
              </div>

            <div className="space-y-3 fade-in-section">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex-1 border-primary text-primary hover:bg-primary hover:text-black text-sm md:text-base py-5 md:py-6"
                  onClick={() => window.open('https://www.instagram.com/onebarbershop_vl', '_blank')}
                >
                  <Icon name="Instagram" size={20} className="mr-1 md:mr-2 md:w-6 md:h-6" />
                  <span className="hidden sm:inline">Instagram</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex-1 border-primary text-primary hover:bg-primary hover:text-black text-sm md:text-base py-5 md:py-6"
                  onClick={() => window.open('https://wa.me/79841563771', '_blank')}
                >
                  <Icon name="MessageCircle" size={20} className="mr-1 md:mr-2 md:w-6 md:h-6" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex-1 border-primary text-primary hover:bg-primary hover:text-black text-sm md:text-base py-5 md:py-6"
                  onClick={() => window.open('https://t.me/one_barbershop1', '_blank')}
                >
                  <Icon name="Send" size={20} className="mr-1 md:mr-2 md:w-6 md:h-6" />
                  <span className="hidden sm:inline">Telegram</span>
                </Button>
              </div>
              <p className="text-gray-500 text-xs text-center">
                {language === 'ru' ? '* Meta признана экстремистской организацией и запрещена на территории РФ' : '* Meta is recognized as an extremist organization and banned in the Russian Federation'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/download/audio/2022/03/10/audio_3d5a351b2f.mp3" type="audio/mpeg" />
      </audio>

      <a
        href="https://wa.me/79841563771?text=Здравствуйте!%20Хочу%20записаться%20в%20барбершоп"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/80 text-black p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
        aria-label="WhatsApp"
      >
        <Icon name="MessageCircle" size={28} />
      </a>

      <footer className="py-6 md:py-8 px-4 bg-black border-t border-primary/20">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <p className="text-gray-400 text-sm md:text-base">
            © 2024 ONEBarbershop. {language === 'ru' ? 'Все права защищены.' : 'All rights reserved.'}
          </p>
          <button
            onClick={() => setShowPrivacyModal(true)}
            className="text-primary hover:text-primary/80 text-sm underline transition-colors"
          >
            {language === 'ru' ? 'Политика конфиденциальности' : 'Privacy Policy'}
          </button>
        </div>
      </footer>

      {showReviewsModal && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
          onClick={() => setShowReviewsModal(false)}
        >
          <div className="relative max-w-4xl w-full h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowReviewsModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors z-10"
            >
              <Icon name="X" size={40} />
            </button>
            <div className="bg-zinc-900 rounded-lg p-6 h-full overflow-auto">
              <div className="sw-app" data-app="d200486f3453f2f42f98c88a98746150"></div>
            </div>
          </div>
        </div>
      )}

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

            <div className="relative">
              <img
                src={serviceImages[0]}
                alt="Прайс-лист услуг"
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />
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
                {language === 'ru' ? 'ЗАПИСАТЬСЯ СЕЙЧАС' : 'BOOK NOW'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showPrivacyModal && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowPrivacyModal(false)}
        >
          <div 
            className="relative max-w-4xl w-full bg-zinc-900 rounded-lg p-6 md:p-8 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            >
              <Icon name="X" size={32} />
            </button>

            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6">
              {language === 'ru' ? 'Политика конфиденциальности' : 'Privacy Policy'}
            </h2>

            <div className="text-gray-300 space-y-4 text-sm md:text-base">
              {language === 'ru' ? (
                <>
                  <p className="text-gray-400 text-sm">Дата вступления в силу: 20 октября 2024</p>
                  
                  <h3 className="text-xl font-bold text-white mt-6 mb-3">1. Сбор информации</h3>
                  <p>ONEBarbershop собирает следующую информацию:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Имя и номер телефона при записи на услуги</li>
                    <li>Информация о посещениях и предпочтениях услуг</li>
                    <li>Данные взаимодействия через WhatsApp, Telegram, Instagram</li>
                  </ul>

                  <h3 className="text-xl font-bold text-white mt-6 mb-3">2. Использование информации</h3>
                  <p>Мы используем собранную информацию для:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Подтверждения и управления записями</li>
                    <li>Улучшения качества обслуживания</li>
                    <li>Отправки напоминаний о записях</li>
                    <li>Информирования об акциях и новых услугах</li>
                  </ul>

                  <h3 className="text-xl font-bold text-white mt-6 mb-3">3. Защита данных</h3>
                  <p>ONEBarbershop принимает меры для защиты ваших персональных данных. Мы не передаём вашу информацию третьим лицам без вашего согласия, за исключением случаев, предусмотренных законом.</p>

                  <h3 className="text-xl font-bold text-white mt-6 mb-3">4. Cookies</h3>
                  <p>Наш сайт использует cookies для улучшения пользовательского опыта. Вы можете отключить cookies в настройках браузера.</p>

                  <h3 className="text-xl font-bold text-white mt-6 mb-3">5. Ваши права</h3>
                  <p>Вы имеете право:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Запросить доступ к вашим персональным данным</li>
                    <li>Запросить исправление неточных данных</li>
                    <li>Запросить удаление ваших данных</li>
                    <li>Отозвать согласие на обработку данных</li>
                  </ul>

                  <h3 className="text-xl font-bold text-white mt-6 mb-3">6. Контакты</h3>
                  <p>По вопросам конфиденциальности свяжитесь с нами:</p>
                  <ul className="list-none space-y-2 ml-4">
                    <li>📍 Адрес: ул. Адм.Фокина 9а, Владивосток</li>
                    <li>📞 Телефон: +7 (984) 156-37-71</li>
                    <li>💬 WhatsApp: +7 (984) 156-37-71</li>
                  </ul>

                  <h3 className="text-xl font-bold text-white mt-6 mb-3">7. Изменения политики</h3>
                  <p>Мы можем обновлять эту политику конфиденциальности. Все изменения будут опубликованы на этой странице.</p>
                </>
              ) : (
                <>
                  <p className="text-gray-400 text-sm">Effective Date: October 20, 2024</p>
                  
                  <h3 className="text-xl font-bold text-white mt-6 mb-3">1. Information Collection</h3>
                  <p>ONEBarbershop collects the following information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Name and phone number when booking services</li>
                    <li>Information about visits and service preferences</li>
                    <li>Interaction data through WhatsApp, Telegram, Instagram</li>
                  </ul>

                  <h3 className="text-xl font-bold text-white mt-6 mb-3">2. Use of Information</h3>
                  <p>We use the collected information to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Confirm and manage appointments</li>
                    <li>Improve service quality</li>
                    <li>Send appointment reminders</li>
                    <li>Inform about promotions and new services</li>
                  </ul>

                  <h3 className="text-xl font-bold text-white mt-6 mb-3">3. Data Protection</h3>
                  <p>ONEBarbershop takes measures to protect your personal data. We do not share your information with third parties without your consent, except as required by law.</p>

                  <h3 className="text-xl font-bold text-white mt-6 mb-3">4. Cookies</h3>
                  <p>Our website uses cookies to improve user experience. You can disable cookies in your browser settings.</p>

                  <h3 className="text-xl font-bold text-white mt-6 mb-3">5. Your Rights</h3>
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Request access to your personal data</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Withdraw consent for data processing</li>
                  </ul>

                  <h3 className="text-xl font-bold text-white mt-6 mb-3">6. Contact</h3>
                  <p>For privacy questions, contact us:</p>
                  <ul className="list-none space-y-2 ml-4">
                    <li>📍 Address: 9a Admiral Fokina St, Vladivostok</li>
                    <li>📞 Phone: +7 (984) 156-37-71</li>
                    <li>💬 WhatsApp: +7 (984) 156-37-71</li>
                  </ul>

                  <h3 className="text-xl font-bold text-white mt-6 mb-3">7. Policy Changes</h3>
                  <p>We may update this privacy policy. All changes will be published on this page.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-primary transition-colors z-10 bg-black/50 rounded-full p-2"
          >
            <Icon name="X" size={32} className="sm:w-10 sm:h-10" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(selectedImage === 0 ? portfolio.length - 1 : selectedImage - 1);
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-10 bg-black/50 rounded-full p-2"
          >
            <Icon name="ChevronLeft" size={40} className="sm:w-14 sm:h-14" />
          </button>

          <div 
            className="w-full h-full flex flex-col items-center justify-center max-w-6xl mx-auto px-12 sm:px-16" 
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleGalleryTouchStart}
            onTouchMove={handleGalleryTouchMove}
            onTouchEnd={handleGalleryTouchEnd}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={portfolio[selectedImage]} 
                alt={`Работа ${selectedImage + 1}`}
                className="max-w-full max-h-[calc(100vh-120px)] sm:max-h-[calc(100vh-100px)] w-auto h-auto object-contain select-none"
                draggable={false}
              />
            </div>
            <p className="text-center text-gray-400 mt-4 text-base sm:text-lg font-medium">
              {selectedImage + 1} / {portfolio.length}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(selectedImage === portfolio.length - 1 ? 0 : selectedImage + 1);
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-10 bg-black/50 rounded-full p-2"
          >
            <Icon name="ChevronRight" size={40} className="sm:w-14 sm:h-14" />
          </button>
        </div>
      )}
    </div>
  );
}