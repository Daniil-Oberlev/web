import { Route, Routes } from 'react-router-dom';

import {
  About,
  Cart,
  Catalog,
  Contacts,
  Delivery,
  Home,
  Layout,
  Privacy,
  Register,
  Terms,
} from '@/pages';
import { ROUTES } from '@/shared/api/routes';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.CATALOG} element={<Catalog />} />
        <Route path={ROUTES.CONTACTS} element={<Contacts />} />
        <Route path={ROUTES.DELIVERY} element={<Delivery />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route path={ROUTES.PRIVACY} element={<Privacy />} />
        <Route path={ROUTES.TERMS} element={<Terms />} />
      </Route>
      <Route path={ROUTES.REGISTER} element={<Register />} />
    </Routes>
  );
};
