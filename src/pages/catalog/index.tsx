import {categories} from '@/shared/products'

import "../index.css";
import "./index.css"

export const Catalog = () => {
  return (
    <main className="content">
      <h2 className="content__header">КАТАЛОГ СТРОИТЕЛЬНЫХ МАТЕРИАЛОВ "СТОЛПЛИТ"</h2>
      <p>
        В нашем каталоге представлен широкий ассортимент строительных материалов, 
        инструментов и крепежа для профессионального и домашнего использования. 
        Все товары в наличии на складе.
      </p>

      {categories.map(category => (
        <section key={category.id} className="category-section">
          <h3 className="section__header">{category.name}</h3>
          <div className="products-grid">
            {category.products.map(product => (
              <div key={product.id} className="product-card">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image"
                  width={200}
                  height={150}
                />
                <h4 className="product-name">{product.name}</h4>
                <p className="product-description">{product.description}</p>
                <div className="product-price">{product.price}</div>
                <button className="product-button">В корзину</button>
              </div>
            ))}
          </div>
        </section>
      ))}

      <p>
        <strong>Не нашли нужный товар?</strong> Оставьте заявку нашему менеджеру - 
        мы найдем и привезем для вас любой строительный материал под заказ.
      </p>
    </main>
  );
};