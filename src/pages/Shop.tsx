import { useState } from 'react';
import { Product } from '@/types/shop';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Boys Toys 101 карат, 40 мл',
    description: 'Паста для укладки волос высокой фиксации с низким уровнем блеска',
    price: 1200,
    image: 'https://cdn.poehali.dev/files/7b998d7a-bb75-4b82-b517-e82c39761e25.png',
    category: 'styling',
    inStock: true,
  },
  {
    id: '2',
    name: 'Шампунь для бороды',
    description: 'Мягкое очищение и увлажнение бороды. Натуральные компоненты, приятный аромат.',
    price: 890,
    image: 'https://images.unsplash.com/photo-1580870069867-74c57ee60d19?w=500&h=500&fit=crop',
    category: 'beard-care',
    inStock: true,
  },
  {
    id: '3',
    name: 'Масло для бороды',
    description: 'Питает и смягчает бороду, придает здоровый блеск. Аромат кедра и сандала.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop',
    category: 'beard-care',
    inStock: true,
  },
  {
    id: '4',
    name: 'Глина для укладки',
    description: 'Средняя фиксация с натуральным матовым финишем. Легко смывается.',
    price: 1100,
    image: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=500&h=500&fit=crop',
    category: 'styling',
    inStock: true,
  },
  {
    id: '5',
    name: 'Воск для усов',
    description: 'Сильная фиксация для создания четкой формы усов. Долговременный эффект.',
    price: 750,
    image: 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=500&h=500&fit=crop',
    category: 'beard-care',
    inStock: true,
  },
  {
    id: '6',
    name: 'Расческа для бороды',
    description: 'Деревянная расческа ручной работы из бука. Антистатический эффект.',
    price: 650,
    image: 'https://images.unsplash.com/photo-1595348020949-87cdfbb44174?w=500&h=500&fit=crop',
    category: 'accessories',
    inStock: true,
  },
  {
    id: '7',
    name: 'Шампунь глубокой очистки',
    description: 'Эффективно очищает волосы от стайлинга, себума и загрязнений.',
    price: 980,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
    category: 'hair-care',
    inStock: true,
  },
  {
    id: '8',
    name: 'Набор для бритья',
    description: 'Профессиональный набор: станок, помазок, мыло для бритья в деревянной коробке.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=500&h=500&fit=crop',
    category: 'accessories',
    inStock: false,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'Все товары' },
  { id: 'styling', label: 'Стайлинг' },
  { id: 'beard-care', label: 'Уход за бородой' },
  { id: 'hair-care', label: 'Уход за волосами' },
  { id: 'accessories', label: 'Аксессуары' },
];

export const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Каталог товаров</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Профессиональная косметика для ухода за волосами и бородой
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              В этой категории пока нет товаров
            </p>
          </div>
        )}
      </div>
    </div>
  );
};