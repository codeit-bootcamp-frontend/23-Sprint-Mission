import { Outlet } from "react-router";

// Components
import Header from "../Header";
import Footer from "../footer";

export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
