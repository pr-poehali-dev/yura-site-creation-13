import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  language: 'ru' | 'en';
  currentHeroImage: number;
  heroImages: string[];
  isPlaying: boolean;
  onMusicToggle: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export const HeroSection = ({
  language,
  currentHeroImage,
  heroImages,
  isPlaying,
  onMusicToggle,
  audioRef,
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHeroImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt="Barbershop hero"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          {language === 'ru' ? 'ONE Barbershop' : 'ONE Barbershop'}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 animate-fade-in-delay">
          {language === 'ru' 
            ? 'Мужской стиль и традиции в сердце города' 
            : 'Men\'s style and traditions in the heart of the city'}
        </p>
        <div className="flex gap-4 justify-center animate-fade-in-delay-2">
          <a href="https://n1206241.yclients.com" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
              {language === 'ru' ? 'Записаться онлайн' : 'Book Online'}
            </Button>
          </a>
          <a href="https://wa.me/79841563771" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              WhatsApp
            </Button>
          </a>
        </div>
        <button
          onClick={onMusicToggle}
          className="mt-8 px-6 py-3 bg-black/50 hover:bg-black/70 border border-primary/50 rounded-full flex items-center gap-2 mx-auto transition-all"
        >
          <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
          <span>{isPlaying ? (language === 'ru' ? 'Пауза' : 'Pause') : (language === 'ru' ? 'Включить музыку' : 'Play Music')}</span>
        </button>
      </div>
      <audio ref={audioRef} loop>
        <source src="https://cdn.poehali.dev/files/44f01d91-7d01-433d-ab3b-6a6ca5a29ef9.mp3" type="audio/mpeg" />
      </audio>
    </section>
  );
};
