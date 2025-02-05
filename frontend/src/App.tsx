
import { Route, Routes } from "react-router-dom";
import { DetailsPage } from "./DetailsPage";
import { ListingsPage } from "./ListingsPage";

function App() {
    return (
    <main className="flex flex-col items-center justify-center h-screen">
      
      <Routes>
        <Route path="/" element={<ListingsPage />} />
        <Route path="/listings/:id" element={<DetailsPage />} />
      </Routes>
    </main>
  );
}

export default App;
