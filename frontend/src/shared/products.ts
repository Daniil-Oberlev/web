import type { Category } from '~/@types';

export const categories: Category[] = [
  {
    id: 1,
    name: 'Отделочные материалы',
    products: [
      {
        id: 1,
        name: 'Гипсокартон влагостойкий',
        price: '450 руб/лист',
        description: 'Размер 1200x2500x12.5 мм, для влажных помещений',
        image: '/products/gips.jpg',
      },
      {
        id: 2,
        name: 'Шпаклевка финишная',
        price: '850 руб/25 кг',
        description: 'Для финишного выравнивания стен под покраску',
        image: '/products/shpak.jpg',
      },
      {
        id: 3,
        name: 'Обои виниловые',
        price: '1200 руб/рулон',
        description: 'Ширина 53 см, длина 10 м, моющиеся',
        image: '/products/oboi.jpg',
      },
    ],
  },
  {
    id: 2,
    name: 'Инструменты',
    products: [
      {
        id: 4,
        name: 'Перфоратор SDS-MAX',
        price: '12 500 руб',
        description: 'Мощность 900 Вт, 3 режима работы',
        image: '/products/perf.jpg',
      },
      {
        id: 5,
        name: 'Шуруповерт аккумуляторный',
        price: '6 800 руб',
        description: 'Литий-ионный аккумулятор 18В, кейс в комплекте',
        image: '/products/shurup.jpg',
      },
      {
        id: 6,
        name: 'Лазерный уровень',
        price: '3 200 руб',
        description: 'Проекция 3 линий, самовыравнивание',
        image: '/products/laser.jpg',
      },
    ],
  },
  {
    id: 3,
    name: 'Крепеж и расходные материалы',
    products: [
      {
        id: 7,
        name: 'Дюбель-гвоздь 6x40',
        price: '120 руб/упак 100 шт',
        description: 'Для быстрого монтажа в бетон и кирпич',
        image: '/products/gvozd.jpg',
      },
      {
        id: 8,
        name: 'Саморезы по дереву',
        price: '95 руб/упак 200 шт',
        description: '3.5x35 мм, оцинкованные, острый наконечник',
        image: '/products/samorez.jpg',
      },
      {
        id: 9,
        name: 'Монтажная пена',
        price: '480 руб/баллон',
        description: '750 мл, профессиональная, с пистолетом',
        image: '/products/pena.jpg',
      },
    ],
  },
];
