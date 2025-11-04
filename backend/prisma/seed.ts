import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['info', 'warn', 'error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log('Seeding database...');

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('DATABASE_URL is not set in .env file');
    process.exit(1);
  }

  const urlMatch = dbUrl.match(/mongodb\+srv:\/\/[^/]+\/([^?]+)/);
  if (!urlMatch || !urlMatch[1]) {
    console.error('DATABASE_URL must include database name!');
    console.error('Format: mongodb+srv://user:pass@cluster.mongodb.net/database_name?options');
    console.error('Current URL:', dbUrl.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
    process.exit(1);
  }

  console.log(`Connecting to database: ${urlMatch[1]}...`);

  try {
    await prisma.$connect();
    console.log('Connected to database');
  } catch (error: any) {
    console.error('Failed to connect to database:', error.message);
    if (error.message?.includes('empty database name')) {
      console.error('Fix: Add database name to DATABASE_URL');
      console.error('Example: mongodb+srv://user:pass@cluster.mongodb.net/stolplit?retryWrites=true&w=majority');
    }
    throw error;
  }

  console.log('Clearing existing data...');
  try {
    try {
      await prisma.product.deleteMany({});
      console.log('Products deleted');
    } catch (e: any) {
      if (e.code !== 'P2010') {
        console.log('Could not delete products (may not exist yet)');
      }
    }
    try {
      await prisma.category.deleteMany({});
      console.log('Categories deleted');
    } catch (e: any) {
      if (e.code !== 'P2010') {
        console.log('Could not delete categories (may not exist yet)');
      }
    }
  } catch (error: any) {
    if (error.code === 'P2010') {
      console.error('Connection error. Please check:');
      console.error('1. Network Access in MongoDB Atlas - add your IP address');
      console.error('2. DATABASE_URL in .env file is correct');
      throw error;
    }
    console.error('Warning: Could not clear existing data:', error);
  }

  console.log('Creating categories...');

  const category1 = await prisma.category.create({
    data: {
      name: 'Отделочные материалы',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Инструменты',
    },
  });

  const category3 = await prisma.category.create({
    data: {
      name: 'Крепеж и расходные материалы',
    },
  });

  console.log('Categories created');
  console.log('Creating products...');

  await prisma.product.createMany({
    data: [
      {
        name: 'Гипсокартон влагостойкий',
        price: '450 руб/лист',
        description: 'Размер 1200x2500x12.5 мм, для влажных помещений',
        image: '/products/gips.jpg',
        categoryId: category1.id,
      },
      {
        name: 'Шпаклевка финишная',
        price: '850 руб/25 кг',
        description: 'Для финишного выравнивания стен под покраску',
        image: '/products/shpak.jpg',
        categoryId: category1.id,
      },
      {
        name: 'Обои виниловые',
        price: '1200 руб/рулон',
        description: 'Ширина 53 см, длина 10 м, моющиеся',
        image: '/products/oboi.jpg',
        categoryId: category1.id,
      },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        name: 'Перфоратор SDS-MAX',
        price: '12 500 руб',
        description: 'Мощность 900 Вт, 3 режима работы',
        image: '/products/perf.jpg',
        categoryId: category2.id,
      },
      {
        name: 'Шуруповерт аккумуляторный',
        price: '6 800 руб',
        description: 'Литий-ионный аккумулятор 18В, кейс в комплекте',
        image: '/products/shurup.jpg',
        categoryId: category2.id,
      },
      {
        name: 'Лазерный уровень',
        price: '3 200 руб',
        description: 'Проекция 3 линий, самовыравнивание',
        image: '/products/laser.jpg',
        categoryId: category2.id,
      },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        name: 'Дюбель-гвоздь 6x40',
        price: '120 руб/упак 100 шт',
        description: 'Для быстрого монтажа в бетон и кирпич',
        image: '/products/gvozd.jpg',
        categoryId: category3.id,
      },
      {
        name: 'Саморезы по дереву',
        price: '95 руб/упак 200 шт',
        description: '3.5x35 мм, оцинкованные, острый наконечник',
        image: '/products/samorez.jpg',
        categoryId: category3.id,
      },
      {
        name: 'Монтажная пена',
        price: '480 руб/баллон',
        description: '750 мл, профессиональная, с пистолетом',
        image: '/products/pena.jpg',
        categoryId: category3.id,
      },
    ],
  });

  console.log('Products created');

  const productCount = await prisma.product.count();
  const categoryCount = await prisma.category.count();

  console.log('\nSummary:');
  console.log(`Created ${categoryCount} categories`);
  console.log(`Created ${productCount} products`);
  console.log('\nDatabase seeding completed successfully!');
}

main()
  .catch((e: any) => {
    console.error('Error seeding database:', e.message || e);
    if (e.code === 'P2010') {
      console.error('Troubleshooting tips:');
      if (e.meta?.message?.includes('empty database name')) {
        console.error('DATABASE_URL is missing database name!');
        console.error('Fix: Add database name after cluster host:');
        console.error('mongodb+srv://user:pass@cluster.mongodb.net/stolplit?retryWrites=true&w=majority');
      } else {
        console.error('1. Check your DATABASE_URL in .env file (must include database name)');
        console.error('2. Make sure MongoDB Atlas allows connections from your IP (0.0.0.0/0)');
        console.error('3. Verify network connectivity');
        console.error('4. Check if SSL/TLS is properly configured');
      }
    }
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Disconnected from database');
  });

