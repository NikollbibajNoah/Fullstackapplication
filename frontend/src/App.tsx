import { Route, Routes } from "react-router-dom";
import { DetailsPage } from "./DetailsPage";
import { ListingsPage } from "./ListingsPage";
import { Header } from "./Header";

function App() {
  return (
    <div className="w-full h-full">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<ListingsPage />} />
          <Route path="/listings/:id" element={<DetailsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
