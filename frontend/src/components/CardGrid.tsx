import { Listing } from "../Listing";
import { useLocation, useNavigate } from "react-router-dom";
import { ListingCard } from "./ListingCard";
import {
  addFavorite,
  isItemInLocalStorage,
  removeFavorite,
} from "../service/FavoriteService";

export interface CardGridProps {
  data: Listing[] | undefined;
  page: number;
  rows: number;
}

export const CardGrid = ({ data, page, rows }: CardGridProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = function (id: string) {
    const scrollPosition = window.scrollY;

    const currentURL = location.pathname + location.search;

    navigate(`/listings/${id}`, {
      state: { first: page, rows: rows, scrollPosition, previousURL: currentURL  }, //Save Status of the page
    });
  };

  const handleFavorite = (listing: Listing, isFavorite: boolean) => {
    if (!isFavorite) {
      console.log("Remove Favorite:", listing);
      removeFavorite(listing);
    } else {
      console.log("Add Favorite:", listing);
      addFavorite(listing);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data &&
          data.length > 0 &&
          data.map((listing: Listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              isFavorite={isItemInLocalStorage(listing.id)}
              onDetails={() => handleNavigation(listing.id)}
              onFavorite={handleFavorite}
            />
          ))}
      </div>
    </div>
  );
};
