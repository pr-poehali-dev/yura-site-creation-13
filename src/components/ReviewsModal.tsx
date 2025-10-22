import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Review {
  name: string;
  nameEn: string;
  text: string;
  textEn: string;
  rating: number;
}

interface ReviewsModalProps {
  language: 'ru' | 'en';
  reviews: Review[];
  onClose: () => void;
}

export const ReviewsModal = ({
  language,
  reviews,
  onClose,
}: ReviewsModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-black border border-primary/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
        >
          <Icon name="X" size={24} />
        </button>
        <div className="p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {language === 'ru' ? 'Отзывы наших клиентов' : 'Client Reviews'}
          </h2>
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <Card key={index} className="bg-black/50 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">
                          {language === 'ru' ? review.name : review.nameEn}
                        </h3>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Icon key={i} name="Star" size={16} className="text-primary fill-primary" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300">
                        {language === 'ru' ? review.text : review.textEn}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
