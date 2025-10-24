import { Outlet } from 'react-router-dom';

import {
  BannerSidebar,
  Footer,
  Header,
  Navigation,
  NavSidebar,
} from '@/widgets';

export const Layout = () => {
  return (
    <>
      <Header />
      <Navigation />
      <div className='main'>
        <NavSidebar />
        <Outlet />
        <BannerSidebar />
      </div>
      <Footer />
    </>
  );
};
