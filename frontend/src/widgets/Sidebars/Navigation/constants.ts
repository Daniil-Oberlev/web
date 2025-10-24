import { ROUTES } from '@/shared/api/routes';

export const NAV_ITEMS = [
  {
    path: ROUTES.HOME,
    label: 'Главная',
  },
  {
    path: ROUTES.CATALOG,
    label: 'Каталог',
  },
  {
    path: ROUTES.ABOUT,
    label: 'О компании',
  },
  {
    path: ROUTES.DELIVERY,
    label: 'Доставка',
  },
  {
    path: ROUTES.CONTACTS,
    label: 'Контакты',
  },
] as const;
