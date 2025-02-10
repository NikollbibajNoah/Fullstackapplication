import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Listing } from "../Listing";
import { useNavigate } from "react-router-dom";
import Dummy from "../assets/images/dummy.png";

export interface CardGridProps {
  data: Listing[] | undefined;
}

export const CardGrid = ({ data }: CardGridProps) => {
  const navigate = useNavigate();

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = Dummy;
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data?.map((listing: Listing) => (
          <Card
            key={listing.id}
            title={
              <h2 className="text-sm sm:text-lg lg:text-2xl text-ellipsis line-clamp-2 h-10 sm:h-14 lg:h-16">
                {listing.name}
              </h2>
            }
            header={
              <div className="aspect-square">
                <img
                  src={listing.images.picture_url}
                  alt={listing.name}
                  className="w-full h-full object-cover rounded-t"
                  onError={handleImageError}
                />
              </div>
            }
            footer={
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-sm sm:text-base lg:text-lg">
                  ${listing.price}
                </h2>
                <Button
                  className="ml-auto"
                  label="Details"
                  onClick={function () {
                    navigate(`/listings/${listing.id}`);
                  }}
                />
              </div>
            }
          >
            <p className="text-xs sm:text-sm lg:text-base text-ellipsis line-clamp-4">
              {listing.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};
