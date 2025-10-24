import './index.css';

import type { BannerProps } from '~/@types';

export const Banner = ({ link, image, text }: BannerProps) => {
  return (
    <article>
      <a href={link}>
        <img src={image.src} alt={image.alt} className='banner__image' />
        <p className='banner__text'>{text}</p>
      </a>
    </article>
  );
};
