import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";

// Layout
import MainLayout from "./components/layout/MainLayout";

// Pages
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ItemsPage from "./pages/ItemsPage";
import AddItem from "./pages/AddItem";
import ProductPage from "./pages/Product";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="items">
          <Route index element={<ItemsPage />} />
          <Route path=":productId" element={<ProductPage />} />
        </Route>
        <Route path="additem" element={<AddItem />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  </BrowserRouter>,
);
