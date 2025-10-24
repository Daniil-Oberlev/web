import { Outlet } from "react-router-dom";
import {
  Header,
  Navigation,
  Footer,
  NavSidebar,
  BannerSidebar,
} from "@/widgets";

export const Layout = () => {
  return (
    <>
      <Header />
      <Navigation />
      <div className="main">
        <NavSidebar />
        <Outlet />
        <BannerSidebar />
      </div>
      <Footer />
    </>
  );
};
