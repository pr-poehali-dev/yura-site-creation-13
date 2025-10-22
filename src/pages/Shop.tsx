import { useState, useEffect } from 'react';
import { Product } from '@/types/shop';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { analytics } from '@/lib/analytics';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Boys Toys Rock & Roll Pomade',
    description: 'Помада для волос сильной фиксации',
    price: 1200,
    image: 'https://cdn.poehali.dev/files/8175ddb9-ac0e-4a9c-96b4-175e476923e5.png',
    category: 'styling',
    inStock: true,
  },
  {
    id: '2',
    name: 'Boys Toys 101 карат',
    description: 'Паста для укладки высокой фиксации с низким уровнем блеска, 40 мл',
    price: 1200,
    image: 'https://cdn.poehali.dev/files/7b998d7a-bb75-4b82-b517-e82c39761e25.png',
    category: 'styling',
    inStock: true,
  },
  {
    id: '3',
    name: 'Boys Toys Clay Pomade',
    description: 'Глина-помада средней фиксации с матовым эффектом',
    price: 1150,
    image: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=500&h=500&fit=crop',
    category: 'styling',
    inStock: true,
  },
  {
    id: '4',
    name: 'Boys Toys Hair Wax',
    description: 'Воск для волос сильной фиксации с естественным блеском',
    price: 1100,
    image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=500&h=500&fit=crop',
    category: 'styling',
    inStock: true,
  },
  {
    id: '5',
    name: 'American Crew Fiber',
    description: 'Волокнистая паста для укладки. Сильная фиксация, матовый финиш',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=500&h=500&fit=crop',
    category: 'styling',
    inStock: true,
  },
  {
    id: '6',
    name: 'Масло для бороды',
    description: 'Натуральное масло для ухода за бородой. Смягчает и придает блеск',
    price: 890,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop',
    category: 'beard-care',
    inStock: true,
  },
  {
    id: '7',
    name: 'Бальзам для бороды',
    description: 'Увлажняющий бальзам с легкой фиксацией для укладки бороды',
    price: 950,
    image: 'https://images.unsplash.com/photo-1580870069867-74c57ee60d19?w=500&h=500&fit=crop',
    category: 'beard-care',
    inStock: true,
  },
  {
    id: '8',
    name: 'Шампунь для бороды',
    description: 'Деликатное очищение бороды с натуральными маслами',
    price: 780,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
    category: 'beard-care',
    inStock: true,
  },
  {
    id: '9',
    name: 'Воск для усов',
    description: 'Специальный воск для усов. Сверхсильная фиксация',
    price: 650,
    image: 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=500&h=500&fit=crop',
    category: 'beard-care',
    inStock: true,
  },
  {
    id: '10',
    name: 'Расческа для бороды',
    description: 'Деревянная расческа ручной работы из бука',
    price: 550,
    image: 'https://images.unsplash.com/photo-1595348020949-87cdfbb44174?w=500&h=500&fit=crop',
    category: 'accessories',
    inStock: true,
  },
  {
    id: '11',
    name: 'Набор для бритья премиум',
    description: 'Профессиональный набор: станок, помазок, мыло',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=500&h=500&fit=crop',
    category: 'accessories',
    inStock: true,
  },
  {
    id: '12',
    name: 'Ножницы для стрижки бороды',
    description: 'Профессиональные ножницы из японской стали',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1595348020949-87cdfbb44174?w=500&h=500&fit=crop',
    category: 'accessories',
    inStock: true,
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

  useEffect(() => {
    analytics.trackPageView('/shop');
  }, []);

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