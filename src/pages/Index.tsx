import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { ServicesModal } from '@/components/ServicesModal';
import { PortfolioSection } from '@/components/PortfolioSection';
import { ReviewsModal } from '@/components/ReviewsModal';
import { ContactsSection } from '@/components/ContactsSection';

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

const reviews = [
  { 
    name: 'Александр', 
    nameEn: 'Alexander',
    text: 'Отличный барбершоп! Мастера знают свое дело. Стригусь только здесь уже год.', 
    textEn: 'Great barbershop! The masters know their craft. Been coming here for a year.',
    rating: 5 
  },
  { 
    name: 'Михаил', 
    nameEn: 'Michael',
    text: 'Профессиональный подход, приятная атмосфера. Особенно нравится бритье опасной бритвой.', 
    textEn: 'Professional approach, pleasant atmosphere. Especially love the straight razor shave.',
    rating: 5 
  },
  { 
    name: 'Дмитрий', 
    nameEn: 'Dmitry',
    text: 'Лучшее место для мужской стрижки в городе. Всегда выхожу довольный!', 
    textEn: 'Best place for men\'s haircut in town. Always leave satisfied!',
    rating: 5 
  }
];

export default function Index() {
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
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`global-smoke global-smoke-${i + 1}`}></div>
        ))}
      </div>
      
      <Navigation
        language={language}
        showMobileMenu={showMobileMenu}
        onLanguageToggle={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
        onMobileMenuToggle={() => setShowMobileMenu(!showMobileMenu)}
        onServicesClick={() => setShowServicesModal(true)}
        onReviewsClick={() => setShowReviewsModal(true)}
        onMobileMenuClose={() => setShowMobileMenu(false)}
      />

      <HeroSection
        language={language}
        currentHeroImage={currentHeroImage}
        heroImages={heroImages}
        isPlaying={isPlaying}
        onMusicToggle={toggleMusic}
        audioRef={audioRef}
      />

      <PortfolioSection
        language={language}
        portfolio={portfolio}
        selectedImage={selectedImage}
        onImageClick={(index) => setSelectedImage(index)}
        onImageClose={() => setSelectedImage(null)}
        onGalleryTouchStart={handleGalleryTouchStart}
        onGalleryTouchMove={handleGalleryTouchMove}
        onGalleryTouchEnd={handleGalleryTouchEnd}
        onPrevImage={() => setSelectedImage((prev) => prev !== null ? (prev === 0 ? portfolio.length - 1 : prev - 1) : null)}
        onNextImage={() => setSelectedImage((prev) => prev !== null ? (prev === portfolio.length - 1 ? 0 : prev + 1) : null)}
      />

      <ContactsSection
        language={language}
        onPrivacyClick={() => setShowPrivacyModal(true)}
      />

      <footer className="bg-black border-t border-primary/20 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">ONE</span>
              <img 
                src="https://cdn.poehali.dev/files/7e9a3024-ca8a-4d76-af5f-23dbb82b0379.jpeg" 
                alt="Barber pole" 
                className="h-6 w-auto object-contain"
              />
              <span className="text-xl font-bold">Barbershop</span>
            </div>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                <Icon name="Instagram" size={24} />
              </a>
              <a href="https://wa.me/79841563771" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                <Icon name="MessageCircle" size={24} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">© 2024 ONE Barbershop. {language === 'ru' ? 'Все права защищены.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>

      {showServicesModal && (
        <ServicesModal
          language={language}
          services={services}
          currentServiceImage={currentServiceImage}
          serviceImages={serviceImages}
          onClose={() => setShowServicesModal(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      )}

      {showReviewsModal && (
        <ReviewsModal
          language={language}
          reviews={reviews}
          onClose={() => setShowReviewsModal(false)}
        />
      )}

      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-black border border-primary/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === 'ru' ? 'Политика конфиденциальности' : 'Privacy Policy'}
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  {language === 'ru' 
                    ? 'Мы серьезно относимся к защите ваших персональных данных. Информация, которую вы предоставляете при записи, используется исключительно для связи с вами и подтверждения записи.' 
                    : 'We take the protection of your personal data seriously. The information you provide when booking is used solely to contact you and confirm your appointment.'}
                </p>
                <p>
                  {language === 'ru' 
                    ? 'Мы не передаем ваши данные третьим лицам и используем их только в рамках оказания наших услуг.' 
                    : 'We do not share your data with third parties and use it only for providing our services.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
