import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Беспроводные наушники',
    description: 'Премиум качество звука с активным шумоподавлением',
    price: 12990,
    image: 'https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/884dfefa-e207-4cd7-aa96-6cc1a750356a.jpg',
    category: 'Аудио',
    rating: 4.8,
    inStock: true
  },
  {
    id: '2',
    name: 'Смарт-часы',
    description: 'Элегантный дизайн с мониторингом здоровья',
    price: 24990,
    image: 'https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/7cced214-d13a-4cf1-b4ac-ededaff63d9e.jpg',
    category: 'Носимые устройства',
    rating: 4.7,
    inStock: true
  },
  {
    id: '3',
    name: 'Игровой ноутбук',
    description: 'Мощный процессор и видеокарта для игр',
    price: 89990,
    image: 'https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/fa34e729-46c8-4357-917d-5cb585c5eaa4.jpg',
    category: 'Компьютеры',
    rating: 4.9,
    inStock: true
  },
  {
    id: '4',
    name: 'Портативная колонка',
    description: 'Водонепроницаемая колонка с мощным басом',
    price: 4990,
    image: 'https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/884dfefa-e207-4cd7-aa96-6cc1a750356a.jpg',
    category: 'Аудио',
    rating: 4.5,
    inStock: true
  },
  {
    id: '5',
    name: 'Беспроводная клавиатура',
    description: 'Механическая клавиатура с RGB подсветкой',
    price: 7990,
    image: 'https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/fa34e729-46c8-4357-917d-5cb585c5eaa4.jpg',
    category: 'Аксессуары',
    rating: 4.6,
    inStock: true
  },
  {
    id: '6',
    name: 'Игровая мышь',
    description: 'Программируемая мышь с высоким DPI',
    price: 3990,
    image: 'https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/fa34e729-46c8-4357-917d-5cb585c5eaa4.jpg',
    category: 'Аксессуары',
    rating: 4.7,
    inStock: true
  },
  {
    id: '7',
    name: 'Веб-камера 4K',
    description: 'Профессиональная камера для стриминга',
    price: 8990,
    image: 'https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/7cced214-d13a-4cf1-b4ac-ededaff63d9e.jpg',
    category: 'Аксессуары',
    rating: 4.8,
    inStock: false
  },
  {
    id: '8',
    name: 'Планшет',
    description: 'Легкий планшет для работы и развлечений',
    price: 34990,
    image: 'https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/7cced214-d13a-4cf1-b4ac-ededaff63d9e.jpg',
    category: 'Компьютеры',
    rating: 4.6,
    inStock: true
  }
];

export const categories = ['Все', 'Аудио', 'Носимые устройства', 'Компьютеры', 'Аксессуары'];
