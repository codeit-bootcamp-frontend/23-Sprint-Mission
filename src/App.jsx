import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Community from "./pages/MarketPage/community";
import Items from "./pages/MarketPage/ItemsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AddItem from "./pages/AddItemPage/AddItemPage";

function App() {
  return (
    <BrowserRouter>
      {/* Global Navigation Bar */}
      <Header />
      <div className="withHeader">
        <Routes>
          <Route path="community" element={<Community />} />
          <Route path="items" element={<Items />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="addItem" element={<AddItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
