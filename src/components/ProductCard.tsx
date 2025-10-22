import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import Icon from '@/components/ui/icon';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden bg-secondary">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {!product.inStock && (
          <Badge className="absolute top-4 right-4 bg-destructive">
            Нет в наличии
          </Badge>
        )}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <div className="flex items-center gap-1 text-amber-400">
            <Icon name="Star" size={16} className="fill-current" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Tag" size={16} />
          <span>{product.category}</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-2xl font-bold text-primary">
          {product.price.toLocaleString('ru-RU')} ₽
        </div>
        <Button 
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className="gap-2"
        >
          <Icon name="ShoppingCart" size={18} />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
};
