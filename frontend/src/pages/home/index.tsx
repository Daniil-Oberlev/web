import '../index.css';

import { useMemo, useState } from 'react';

import type { Product } from '~/@types';

import { categories } from '@/shared/products';

export const Home = () => {
  const products: Product[] = useMemo(
    () => categories.flatMap((c) => c.products),
    [],
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = products[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  return (
    <main className='content'>
      <h2 className='content__header'>СТРОИТЕЛЬНЫЙ МАГАЗИН "СТОЛПЛИТ"</h2>
      <p>
        <img
          src='/main.jpg'
          align='left'
          width={200}
          alt='Ассортимент строительного магазина'
          className='content__image'
        />
        Добро пожаловать в строительный магазин <strong>"Столплит"</strong> -
        место, где профессионалы и домашние мастера могут найти все необходимое
        для качественного ремонта и строительства. Наш магазин работает уже
        более 5 лет и обслуживает как крупные строительные компании, так и
        частных клиентов.
      </p>
      <p>
        Мы предлагаем <em>широкий ассортимент</em> строительных материалов,
        профессиональные <strong>инструменты</strong> и сопутствующие товары.
        Наши консультанты - опытные специалисты строительной отрасли с
        многолетним практическим опытом.
      </p>

      {current && (
        <>
          <h3 className='section__header'>Популярные товары</h3>
          <div className='slider'>
            <button
              type='button'
              className='slider__control slider__control--prev'
              onClick={handlePrev}
            >
              ‹
            </button>

            <div className='slider__item product-card'>
              <img
                src={current.image}
                alt={current.name}
                className='product-image'
                width={220}
                height={160}
              />
              <h4 className='product-name'>{current.name}</h4>
              <p className='product-description'>{current.description}</p>
              <div className='product-price'>{current.price}</div>
            </div>

            <button
              type='button'
              className='slider__control slider__control--next'
              onClick={handleNext}
            >
              ›
            </button>
          </div>
        </>
      )}

      <h3 className='section__header'>График поставок:</h3>
      <table border='3' cellPadding='20' cellSpacing='5'>
        <tbody>
          <tr>
            <td rowSpan='3'>Основные категории</td>
            <td colSpan='2' align='center'>
              График обновления ассортимента
            </td>
          </tr>
          <tr>
            <td>Понедельник/Четверг</td>
            <td>Вторник/Пятница</td>
          </tr>
          <tr>
            <td>Отделочные материалы</td>
            <td>Инструменты и оборудование</td>
          </tr>
        </tbody>
      </table>
      <h3 className='section__header'>Основные категории товаров:</h3>
      <ul className='list__circle'>
        <li>Отделочные материалы</li>
        <li>Строительные инструменты</li>
        <li>Крепеж и расходные материалы</li>
      </ul>
      <h3 className='section__header'>Уровни обслуживания:</h3>
      <ol className='list__alphabet-lower'>
        <li>Розничные покупки</li>
        <li>Оптовые поставки</li>
        <li>Корпоративное обслуживание</li>
      </ol>
      <h3 className='section__header'>Структура ассортимента:</h3>
      <ol className='list__alphabet-upper'>
        <li>Базовые материалы</li>
        <li>
          Специализированные товары
          <ol className='list__alphabet-lower'>
            <li>Профессиональный инструмент</li>
            <li>Специализированные смеси</li>
          </ol>
        </li>
        <li>Сопутствующие товары</li>
      </ol>
      <p>
        Наши клиенты оставляют <strong>положительные отзывы</strong> о качестве
        товаров и уровне обслуживания. Приходите в наш магазин и убедитесь в
        <em>высоком качестве</em> нашей продукции!
      </p>
    </main>
  );
};
