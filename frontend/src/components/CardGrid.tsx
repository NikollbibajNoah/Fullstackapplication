import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Listing } from "../Listing";
import { useNavigate } from "react-router-dom";

export interface CardGridProps {
  data: Listing[] | undefined;
}

export const CardGrid = ({ data }: CardGridProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {data?.map((listing: Listing) => (
          <Card
            key={listing.id}
            className=""
            title={
              <h2 className="text-ellipsis line-clamp-2 h-16">{listing.name}</h2>
            }
            header={
              <div className="aspect-square">
                <img
                  src={listing.images.picture_url}
                  alt={listing.name}
                  className="w-full h-full object-cover rounded-t"
                />
              </div>
            }
            footer={
              <div className="flex justify-around items-center">
                <h2 className="font-bold text-lg">${listing.price}</h2>
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
            <p className="text-ellipsis line-clamp-4 ">{listing.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
