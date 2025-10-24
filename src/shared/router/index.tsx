import { Routes, Route } from "react-router-dom";

import { Layout, Home, About, Catalog, Contacts, Delivery } from "@/pages";

import { ROUTES } from "@/shared/api/routes";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.CATALOG} element={<Catalog />} />
        <Route path={ROUTES.CONTACTS} element={<Contacts />} />
        <Route path={ROUTES.DELIVERY} element={<Delivery />} />
      </Route>
    </Routes>
  );
};
