import { Listing } from "../Listing";
import { useNavigate } from "react-router-dom";
import { ListingCard } from "./ListingCard";

export interface CardGridProps {
  data: Listing[] | undefined;
  page: number;
  rows: number;
}

export const CardGrid = ({ data, page, rows }: CardGridProps) => {
  const navigate = useNavigate();

  const handleNavigation = function (id: string) {
    const scrollPosition = window.scrollY;

    navigate(`/listings/${id}`, {
      state: { first: page, rows: rows, scrollPosition }, //Save Status of the page
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data?.map((listing: Listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            onDetails={() => handleNavigation(listing.id)}
          />
        ))}
      </div>
    </div>
  );
};
