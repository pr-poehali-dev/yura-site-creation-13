import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { products, categories } from '@/data/products';
import Icon from '@/components/ui/icon';

export const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');

  const filteredProducts = useMemo(() => {
    const result = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortBy === 'popular') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  return (
    <div className="container py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Магазин средств для ухода</h1>
        <p className="text-muted-foreground">Профессиональная косметика для волос и бороды</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Icon name="Search" size={20} />
              Поиск
            </h3>
            <Input
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Icon name="Layers" size={20} />
              Категории
            </h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="w-full justify-start"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Icon name="DollarSign" size={20} />
              Цена
            </h3>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100000}
                step={1000}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{priceRange[0].toLocaleString('ru-RU')} ₽</span>
                <span>{priceRange[1].toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Icon name="ArrowUpDown" size={20} />
              Сортировка
            </h3>
            <div className="flex flex-col gap-2">
              <Button
                variant={sortBy === 'popular' ? 'default' : 'outline'}
                onClick={() => setSortBy('popular')}
                className="w-full justify-start"
              >
                <Icon name="TrendingUp" size={16} className="mr-2" />
                По популярности
              </Button>
              <Button
                variant={sortBy === 'price-asc' ? 'default' : 'outline'}
                onClick={() => setSortBy('price-asc')}
                className="w-full justify-start"
              >
                <Icon name="ArrowUp" size={16} className="mr-2" />
                Дешевле
              </Button>
              <Button
                variant={sortBy === 'price-desc' ? 'default' : 'outline'}
                onClick={() => setSortBy('price-desc')}
                className="w-full justify-start"
              >
                <Icon name="ArrowDown" size={16} className="mr-2" />
                Дороже
              </Button>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Найдено товаров: <span className="font-semibold text-foreground">{filteredProducts.length}</span>
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Icon name="Package" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Товары не найдены</h3>
              <p className="text-muted-foreground">Попробуйте изменить фильтры или поисковый запрос</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};