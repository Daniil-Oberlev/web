import { Banner } from "@/shared/components/Banner";
import { useState, useEffect, useMemo, KeyboardEvent, ChangeEvent } from "react";
import { categories } from "@/shared/products";
import { BANNER_CONTENT } from "./constants";
import "../index.css";
import "./index.css";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
}

interface Category {
  id: number;
  name: string;
  products: Product[];
}

interface SearchResult extends Product {
  categoryName: string;
}

interface BannerContent {
  link: string;
  image: string;
  text: string;
}

export const BannerSidebar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // Мемоизированный поиск при изменении searchQuery
  const performSearch = useMemo(() => {
    return (query: string): SearchResult[] => {
      if (!query.trim()) {
        return [];
      }

      const searchTerm = query.toLowerCase().trim();
      const results: SearchResult[] = [];

      categories.forEach((category: Category) => {
        category.products.forEach((product: Product) => {
          if (
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.id.toString().includes(searchTerm) // Поиск по ID
          ) {
            results.push({
              ...product,
              categoryName: category.name
            });
          }
        });
      });

      return results;
    };
  }, []);

  // Эффект для поиска при наборе текста
  useEffect(() => {
    const results = performSearch(searchQuery);
    setSearchResults(results);
  }, [searchQuery, performSearch]);

  // Обработчик изменения input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Обработчик нажатия клавиш
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Поиск уже выполняется автоматически, но можно добавить дополнительную логику
      e.currentTarget.blur(); // Убираем фокус с input
    }
  };

  // Очистка поиска
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Проверяем, есть ли активный поиск
  const hasActiveSearch = searchQuery.trim().length > 0;

  return (
    <aside className="aside">
      <div className="navigation__search">
        <input 
          placeholder="поиск по товарам (название, описание, ID)" 
          type="search" 
          className="navigation__search-input"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="navigation__button"
          onClick={() => performSearch(searchQuery)}
        >
          искать
        </button>
        {searchQuery && (
          <button 
            className="navigation__button-clear"
            onClick={handleClearSearch}
            aria-label="Очистить поиск"
          >
            ×
          </button>
        )}
      </div>

      {/* Результаты поиска */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3 className="search-results__title">
            Найдено товаров: {searchResults.length}
          </h3>
          <ul className="search-results__list">
            {searchResults.map((product: SearchResult) => (
              <li key={product.id} className="search-results__item">
                <div className="search-result__content">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="search-result__image"
                  />
                  <div className="search-result__info">
                    <h4 className="search-result__name">{product.name}</h4>
                    <p className="search-result__id">ID: {product.id}</p>
                    <p className="search-result__category">
                      Категория: {product.categoryName}
                    </p>
                    <p className="search-result__description">
                      {product.description}
                    </p>
                    <p className="search-result__price">{product.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Сообщение, если ничего не найдено */}
      {hasActiveSearch && searchResults.length === 0 && (
        <div className="search-no-results">
          <p>По запросу "{searchQuery}" ничего не найдено</p>
        </div>
      )}

      {/* Баннеры показываются только когда нет активного поиска */}
      {!hasActiveSearch && (
        <ul className="banner__list">
          {BANNER_CONTENT.map((banner: BannerContent) => (
            <li key={banner.link}>
              <Banner
                link={banner.link}
                image={banner.image}
                text={banner.text}
              />
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};