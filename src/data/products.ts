import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Масло для бороды Premium',
    description: 'Натуральное масло с древесным ароматом для ухода за бородой',
    price: 1290,
    image: 'https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/e076e098-b3ed-4eac-85bb-3d97e44c33ac.jpg',
    category: 'Борода',
    rating: 4.9,
    inStock: true
  },
  {
    id: '2',
    name: 'Помада для укладки волос',
    description: 'Сильная фиксация с матовым эффектом',
    price: 890,
    image: 'https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/a4b7d7af-b839-4041-a074-a8096610e050.jpg',
    category: 'Укладка',
    rating: 4.8,
    inStock: true
  },
  {
    id: '3',
    name: 'Шампунь для мужчин',
    description: 'Очищающий шампунь для ежедневного использования',
    price: 690,
    image: 'https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/e076e098-b3ed-4eac-85bb-3d97e44c33ac.jpg',
    category: 'Уход',
    rating: 4.7,
    inStock: true
  },
  {
    id: '4',
    name: 'Воск для усов',
    description: 'Профессиональный воск для моделирования усов',
    price: 590,
    image: 'https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/a4b7d7af-b839-4041-a074-a8096610e050.jpg',
    category: 'Борода',
    rating: 4.6,
    inStock: true
  },
  {
    id: '5',
    name: 'Бальзам после бритья',
    description: 'Успокаивающий бальзам с мятным экстрактом',
    price: 790,
    image: 'https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/e076e098-b3ed-4eac-85bb-3d97e44c33ac.jpg',
    category: 'Бритье',
    rating: 4.8,
    inStock: true
  },
  {
    id: '6',
    name: 'Гель для укладки волос',
    description: 'Сильная фиксация с мокрым эффектом',
    price: 690,
    image: 'https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/a4b7d7af-b839-4041-a074-a8096610e050.jpg',
    category: 'Укладка',
    rating: 4.5,
    inStock: true
  },
  {
    id: '7',
    name: 'Набор для бритья',
    description: 'Профессиональный набор: бритва, пена, бальзам',
    price: 2490,
    image: 'https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/e076e098-b3ed-4eac-85bb-3d97e44c33ac.jpg',
    category: 'Бритье',
    rating: 4.9,
    inStock: true
  },
  {
    id: '8',
    name: 'Кондиционер для волос',
    description: 'Питательный кондиционер для мужчин',
    price: 790,
    image: 'https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/e076e098-b3ed-4eac-85bb-3d97e44c33ac.jpg',
    category: 'Уход',
    rating: 4.7,
    inStock: true
  },
  {
    id: '9',
    name: 'Глина для укладки',
    description: 'Матовая текстура с естественным видом',
    price: 990,
    image: 'https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/a4b7d7af-b839-4041-a074-a8096610e050.jpg',
    category: 'Укладка',
    rating: 4.8,
    inStock: true
  },
  {
    id: '10',
    name: 'Расческа для бороды',
    description: 'Деревянная расческа ручной работы',
    price: 490,
    image: 'https://cdn.poehali.dev/projects/fea708e8-7919-4482-b71b-b76894470feb/files/e076e098-b3ed-4eac-85bb-3d97e44c33ac.jpg',
    category: 'Борода',
    rating: 4.6,
    inStock: true
  }
];

export const categories = ['Все', 'Борода', 'Укладка', 'Уход', 'Бритье'];