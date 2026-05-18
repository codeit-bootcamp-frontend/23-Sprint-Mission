import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Items from './pages/Items';
import ItemDetail from './pages/Items/detail';
import AddItem from './pages/AddItem';
import EditItem from './pages/Items/edit';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:productId" element={<ItemDetail />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/items/:productId/edit" element={<EditItem />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
