import './index.css';

import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/api/routes';

import { getCopyright } from './copyright';

export const Footer = () => {
  return (
    <footer className='footer'>
      <p>{getCopyright()}</p>
      <nav>
        <Link to={ROUTES.PRIVACY}>Политика конфиденциальности</Link> |{' '}
        <Link to={ROUTES.TERMS}>Пользовательское соглашение</Link>
      </nav>
    </footer>
  );
};
