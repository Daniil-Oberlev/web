import './index.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/api/routes';
import { useAuth } from '@/shared/providers/AuthProvider';
import { useCart } from '@/shared/providers/useCart';

export const Header = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user, login: authLogin, logout } = useAuth();
  const { totalCount } = useCart();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authLogin(login, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка авторизации');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setLogin('');
    setPassword('');
  };

  if (user) {
    return (
      <header className='header'>
        <img src='/logo.jpg' alt='логотип' className='header__logo' />
        <h1>Столплит</h1>
        <div className='header__user'>
          <span>Добро пожаловать, {user.email}</span>
          <Link to={ROUTES.CART} className='header__cart'>
            Корзина {totalCount > 0 && `(${totalCount})`}
          </Link>
          <button type='button' onClick={handleLogout}>
            выйти
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className='header'>
      <img src='/logo.jpg' alt='логотип' className='header__logo' />
      <h1>Столплит</h1>
      <form className='header__form' onSubmit={handleLogin}>
        <div className='header__inputs'>
          <input
            placeholder='логин'
            type='text'
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <input
            placeholder='пароль'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='header__buttons'>
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Вход...' : 'войти'}
          </button>
          <a href={ROUTES.REGISTER}>регистрация</a>
        </div>
        {error && <div className='header__error'>{error}</div>}
      </form>
    </header>
  );
};
