import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";

// Components
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/footer";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route index element={<Home />} />
    </Routes>
    <Footer />
  </BrowserRouter>,
);
