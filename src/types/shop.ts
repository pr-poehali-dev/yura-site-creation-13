export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'hair-care' | 'styling' | 'beard-care' | 'accessories';
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
