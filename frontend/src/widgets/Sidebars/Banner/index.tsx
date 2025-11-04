import type { BannerContent, Category, Product, SearchResult } from '~/@types';
import type { ChangeEvent, KeyboardEvent } from 'react';

import { useEffect, useMemo, useState } from 'react';

import { Banner } from '@/shared/components/Banner';
import { fetchCategories } from '@/shared/api/products';
import { BANNER_CONTENT } from './constants';

import '../index.css';
import './index.css';

export const BannerSidebar = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const performSearch = useMemo(() => {
    return (query: string): SearchResult[] => {
      if (!query.trim() || categories.length === 0) {
        return [];
      }

      const searchTerm = query.toLowerCase().trim();
      const results: SearchResult[] = [];

      categories.forEach((category: Category) => {
        category.products.forEach((product: Product) => {
          if (
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.id.toString().includes(searchTerm)
          ) {
            results.push({
              ...product,
              categoryName: category.name,
            });
          }
        });
      });

      return results;
    };
  }, [categories]);

  useEffect(() => {
    if (!loading) {
      const results = performSearch(searchQuery);
      setSearchResults(results);
    }
  }, [searchQuery, performSearch, loading]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const hasActiveSearch = searchQuery.trim().length > 0;

  return (
    <aside className='aside'>
      <div className='navigation__search'>
        <input
          placeholder='поиск по товарам'
          type='search'
          className='navigation__search-input'
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button
          className='navigation__button navigation__search-button'
          onClick={() => performSearch(searchQuery)}
        >
          искать
        </button>
        {searchQuery && (
          <button
            className='navigation__button navigation__button-clear'
            onClick={handleClearSearch}
            aria-label='Очистить поиск'
          >
            ×
          </button>
        )}
      </div>

      {searchResults.length > 0 && (
        <div className='search-results'>
          <h3 className='search-results__title'>
            Найдено товаров: {searchResults.length}
          </h3>
          <ul className='search-results__list'>
            {searchResults.map((product: SearchResult) => (
              <li key={product.id} className='search-results__item'>
                <div className='search-result__content'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='search-result__image'
                  />
                  <div>
                    <h4 className='search-result__name'>{product.name}</h4>
                    <p className='search-result__id'>ID: {product.id}</p>
                    <p className='search-result__category'>
                      Категория: {product.categoryName}
                    </p>
                    <p className='search-result__description'>
                      {product.description}
                    </p>
                    <p className='search-result__price'>{product.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasActiveSearch && searchResults.length === 0 && (
        <div className='search-no-results'>
          <p>По запросу "{searchQuery}" ничего не найдено</p>
        </div>
      )}

      {!hasActiveSearch && (
        <ul className='banner__list'>
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
