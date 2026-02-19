import { Outlet } from "react-router";

// Components
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
