import Icon from '@/components/ui/icon';

interface PortfolioSectionProps {
  language: 'ru' | 'en';
  portfolio: string[];
  selectedImage: number | null;
  onImageClick: (index: number) => void;
  onImageClose: () => void;
  onGalleryTouchStart: (e: React.TouchEvent) => void;
  onGalleryTouchMove: (e: React.TouchEvent) => void;
  onGalleryTouchEnd: () => void;
  onPrevImage: () => void;
  onNextImage: () => void;
}

export const PortfolioSection = ({
  language,
  portfolio,
  selectedImage,
  onImageClick,
  onImageClose,
  onGalleryTouchStart,
  onGalleryTouchMove,
  onGalleryTouchEnd,
  onPrevImage,
  onNextImage,
}: PortfolioSectionProps) => {
  return (
    <>
      <section id="portfolio" className="py-20 px-4 fade-in-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            {language === 'ru' ? 'Наши работы' : 'Our Works'}
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            {language === 'ru' 
              ? 'Примеры наших работ - каждая стрижка это произведение искусства' 
              : 'Examples of our work - each haircut is a work of art'}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {portfolio.map((image, index) => (
              <div 
                key={index} 
                className="aspect-square overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => onImageClick(index)}
              >
                <img
                  src={image}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={onImageClose}
        >
          <button
            onClick={onImageClose}
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
          >
            <Icon name="X" size={32} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrevImage();
            }}
            className="absolute left-4 text-white hover:text-primary transition-colors z-10"
          >
            <Icon name="ChevronLeft" size={48} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNextImage();
            }}
            className="absolute right-4 text-white hover:text-primary transition-colors z-10"
          >
            <Icon name="ChevronRight" size={48} />
          </button>

          <div 
            className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onGalleryTouchStart}
            onTouchMove={onGalleryTouchMove}
            onTouchEnd={onGalleryTouchEnd}
          >
            <img
              src={portfolio[selectedImage]}
              alt={`Portfolio ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {portfolio.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  onImageClick(index);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === selectedImage ? 'bg-primary w-8' : 'bg-white/50 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
