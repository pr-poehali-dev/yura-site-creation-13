import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';

interface NavigationProps {
  language: 'ru' | 'en';
  showMobileMenu: boolean;
  onLanguageToggle: () => void;
  onMobileMenuToggle: () => void;
  onServicesClick: () => void;
  onReviewsClick: () => void;
  onMobileMenuClose: () => void;
}

export const Navigation = ({
  language,
  showMobileMenu,
  onLanguageToggle,
  onMobileMenuToggle,
  onServicesClick,
  onReviewsClick,
  onMobileMenuClose,
}: NavigationProps) => {
  const { totalItems } = useCart();

  return (
    <>
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
            <button onClick={onServicesClick} className="hover:text-primary transition-colors">{language === 'ru' ? 'Услуги' : 'Services'}</button>
            <a href="#portfolio" className="hover:text-primary transition-colors">{language === 'ru' ? 'Работы' : 'Portfolio'}</a>
            <Link to="/shop" className="hover:text-primary transition-colors">{language === 'ru' ? 'Магазин' : 'Shop'}</Link>
            <button onClick={onReviewsClick} className="hover:text-primary transition-colors">{language === 'ru' ? 'Отзывы' : 'Reviews'}</button>
            <a href="#contacts" className="hover:text-primary transition-colors">{language === 'ru' ? 'Контакты' : 'Contacts'}</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onLanguageToggle}
              className="text-white hover:text-primary transition-colors font-medium text-sm md:text-base"
            >
              {language === 'ru' ? 'EN' : 'RU'}
            </button>
            <Link to="/cart" className="relative text-white hover:text-primary transition-colors">
              <Icon name="ShoppingCart" size={20} />
              {totalItems > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Link>
            <a href="https://wa.me/79841563771" target="_blank" rel="noopener noreferrer" className="text-primary font-medium flex items-center gap-2 text-sm md:text-base">
              <span className="hidden sm:inline">+7 (984) 156-37-71</span>
              <Icon name="Phone" size={20} className="sm:hidden" />
            </a>
            <button
              onClick={onMobileMenuToggle}
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
            onClick={onMobileMenuClose}
          />
          <div className="fixed top-[60px] left-0 right-0 bg-black/95 backdrop-blur-md z-40 border-b border-primary/20 md:hidden animate-slide-down">
            <div className="flex flex-col p-4 gap-4">
            <button 
              onClick={() => {
                onServicesClick();
                onMobileMenuClose();
              }} 
              className="text-left hover:text-primary transition-colors py-2"
            >
              {language === 'ru' ? 'Услуги' : 'Services'}
            </button>
            <a 
              href="#portfolio" 
              className="hover:text-primary transition-colors py-2"
              onClick={onMobileMenuClose}
            >
              {language === 'ru' ? 'Работы' : 'Portfolio'}
            </a>
            <Link 
              to="/shop" 
              className="hover:text-primary transition-colors py-2"
              onClick={onMobileMenuClose}
            >
              {language === 'ru' ? 'Магазин' : 'Shop'}
            </Link>
            <button 
              onClick={() => {
                onReviewsClick();
                onMobileMenuClose();
              }} 
              className="text-left hover:text-primary transition-colors py-2"
            >
              {language === 'ru' ? 'Отзывы' : 'Reviews'}
            </button>
            <a 
              href="#contacts" 
              className="hover:text-primary transition-colors py-2"
              onClick={onMobileMenuClose}
            >
              {language === 'ru' ? 'Контакты' : 'Contacts'}
            </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};
