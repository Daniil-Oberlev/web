import './index.css';

import { getCopyright } from './copyright';

export const Footer = () => {
  return (
    <footer className='footer'>
      <p>{getCopyright()}</p>
    </footer>
  );
};
