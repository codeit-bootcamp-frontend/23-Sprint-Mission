import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ItemsPage from "./pages/MarketPage/ItemsPage";
import ItemDetailPage from "./pages/ItemDetailPage/ItemDetailPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="withHeader">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/items/:productId" element={<ItemDetailPage />} />
          <Route path="/addItem" element={<AddItemPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
