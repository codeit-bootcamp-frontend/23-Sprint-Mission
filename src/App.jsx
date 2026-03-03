import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MarketPage from "./pages/MarketPage/MarketPage";
import AdditemPage from "./pages/AdditemPage/AdditemPage";
import CommunityPage from "./pages/CommunityPage/CommunityPage";
import Header from "./components/Layout/Header.jsx";


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
  )
}

export default App;
