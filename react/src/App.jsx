import ItemsPage from "./pages/ItemsPage/ItemsPage";
import AdditemPage from "./pages/AdditemPage/additemPage";
import Header from "./components/Items/Header";
import Footer from "./components/Items/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarginTop from "./components/MarginTop";
import MarginBottom from "./components/MarginBottom";
import styles from "./App.module.css";
import ItemDetailPage from "./pages/ItemDetailPage/ItemDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className={styles.main}>
        <MarginTop />
        <Routes>
          <Route path="/items" element={<ItemsPage />}></Route>
          <Route path="/additem" element={<AdditemPage />}></Route>
          <Route path="/items/:productId" element={<ItemDetailPage />} />
        </Routes>
        <MarginBottom />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
