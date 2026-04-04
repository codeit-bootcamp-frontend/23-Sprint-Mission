import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import BestItem from "./components/BestItem";
import GeneralItem from "./components/GeneralItem";
import AddItem from "./components/AddItem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/items" replace />} />
        <Route
          path="/items"
          element={
            <>
              <Header />
              <BestItem />
              <GeneralItem />
            </>
          }
        />
        <Route path="/additem" element={<AddItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
