import { Link } from 'react-router-dom';

import '../index.css';
import './index.css';

import { NAV_ITEMS } from './constants';

export const NavSidebar = () => {
  return (
    <aside className='aside'>
      <nav>
        <ul className='aside__list'>
          {NAV_ITEMS.map(({ path, label }) => (
            <li key={path}>
              <Link to={path}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
