import { Route, Routes } from "react-router-dom";
import { DetailsPage } from "./pages/DetailsPage";
import { Header } from "./Header";
import { ListingsPage } from "./pages/ListingsPage";
import { FavoritesPage } from "./pages/FavoritesPage";

function App() {
  return (
    <div className="w-full h-full">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<ListingsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/listings/:id" element={<DetailsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
