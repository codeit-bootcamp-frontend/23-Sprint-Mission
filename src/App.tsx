import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Community from "./pages/MarketPage/community";
import Items from "./pages/MarketPage/ItemsPage";
import LoginPage from "./pages/LoginPage/LoginPage.js";
import AddItem from "./pages/AddItemPage/AddItemPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ItemDetailPage from "./pages/ItemDetailPage/ItemDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="withHeader">
        <Routes>
          <Route path="/" element={<Navigate to="/items" replace />} />
          <Route path="/community" element={<Community />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/:productId" element={<ItemDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/addItem" element={<AddItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
