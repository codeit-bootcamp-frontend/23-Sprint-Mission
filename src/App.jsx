import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Layout/Header";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MarketPage from "./pages/MarketPage/MarketPage";
import CommunityPage from "./pages/CommunityPage/CommunityPage";
import AdditemPage from "./pages/AdditemPage/AdditemPage";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="withHeader">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="items" element={<MarketPage />} />
          <Route path="additem" element={<AdditemPage />} />
          <Route path="community" element={<CommunityPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;