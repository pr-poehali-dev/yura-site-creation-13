import { Product } from '@/types/shop';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import Icon from '@/components/ui/icon';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
          {!product.inStock && (
            <span className="text-sm text-muted-foreground">(Нет в наличии)</span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className="w-full"
          size="lg"
        >
          <Icon name="ShoppingCart" size={20} className="mr-2" />
          Добавить в корзину
        </Button>
      </CardFooter>
    </Card>
  );
};
