import './index.css';

import type { BannerContent } from '~/@types';

export const Banner = ({ link, image, text }: BannerContent) => {
  return (
    <article>
      <a href={link} className='banner__list-item'>
        <img src={image.src} alt={image.alt} className='banner__image' />
        <p className='banner__text'>{text}</p>
      </a>
    </article>
  );
};
