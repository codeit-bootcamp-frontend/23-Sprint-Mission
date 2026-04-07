import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Layout/Header";
import HomePage from "./pages/HomePage/HomePage";
import MarketPage from "./pages/MarketPage/MarketPage";
import CommunityPage from "./pages/CommunityPage/CommunityPage";
import AdditemPage from "./pages/AdditemPage/AdditemPage";
import ItemPage from "./pages/ItemPage/ItemPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import PolicyPage from "./pages/PolicyPage/PolicyPage";
import FaqPage from "./pages/FaqPage/FaqPage";

const MainContent: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const hideHeader = isAuthPage;

  return (
    <>
      {!hideHeader && <Header />}

      <main className={isAuthPage ? "" : "withHeader"}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="items" element={<MarketPage />} />
          <Route path="items/:productId" element={<ItemPage />} />
          <Route path="additem" element={<AdditemPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="privacy" element={<PolicyPage />} />
          <Route path="faq" element={<FaqPage />} />
        </Routes>
      </main>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

export default App;