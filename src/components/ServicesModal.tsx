import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Service {
  title: string;
  titleEn: string;
  price: string;
  icon: string;
}

interface ServicesModalProps {
  language: 'ru' | 'en';
  services: Service[];
  currentServiceImage: number;
  serviceImages: string[];
  onClose: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

export const ServicesModal = ({
  language,
  services,
  currentServiceImage,
  serviceImages,
  onClose,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: ServicesModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-black border border-primary/30 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
        >
          <Icon name="X" size={24} />
        </button>
        <div className="p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {language === 'ru' ? 'Наши услуги' : 'Our Services'}
          </h2>
          
          <div className="mb-8 relative aspect-video rounded-lg overflow-hidden">
            <div 
              className="relative h-full"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {serviceImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentServiceImage ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={image}
                    alt="Service showcase"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            {serviceImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {serviceImages.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentServiceImage ? 'bg-primary w-8' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <Card key={index} className="bg-black/50 border-primary/20 hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon name={service.icon as any} size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">
                        {language === 'ru' ? service.title : service.titleEn}
                      </h3>
                      <p className="text-2xl font-bold text-primary">{service.price} ₽</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a 
              href="https://n1206241.yclients.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
            >
              {language === 'ru' ? 'Записаться онлайн' : 'Book Online'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
