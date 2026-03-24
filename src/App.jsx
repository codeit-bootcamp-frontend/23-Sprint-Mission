import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Community from "./pages/MarketPage/community.jsx";
import Items from "./pages/MarketPage/ItemsPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import AddItem from "./pages/AddItemPage/AddItemPage.jsx";
import ItemDetailPage from "./pages/ItemDetailPage/ItemDetailPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="withHeader">
        <Routes>
          <Route path="/community" element={<Community />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/:productId" element={<ItemDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/addItem" element={<AddItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;