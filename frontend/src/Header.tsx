import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleFavoritesNavigation = () => {
    navigate("/favorites");
  };

  const handleHomeNavigation = () => {
    navigate("/");
  };
  
  return (
    <div className="bg-slate-500 w-full h-20">
      <div className="flex items-center h-full mx-5">
        <h1 className="text-2xl text-white">Fullstack Airbnb</h1>
        <div className="flex gap-3 ml-auto">
          <Button icon="pi pi-home" 
          onClick={handleHomeNavigation}/>
          <Button
            icon="pi pi-heart"
            severity="danger"
            onClick={handleFavoritesNavigation}
          />
        </div>
      </div>
    </div>
  );
};
