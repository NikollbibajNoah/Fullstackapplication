import { Card } from "primereact/card";
import { Listing } from "../Listing";
import { Button } from "primereact/button";
import Dummy from "../assets/images/dummy.png";
import DefaultProfile from "../assets/images/default.png";

export interface CardProps {
  data: Listing;
  onDetails?: () => void;
}

export const ListingCard = ({ data, onDetails }: CardProps) => {
  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    placeholder?: string
  ) => {
    if (!placeholder) {
      placeholder = Dummy;
    }

    event.currentTarget.src = placeholder;
  };

  return (
    <Card
      title={
        <div className="flex flex-col gap-1">
          <h2 className="text-sm sm:text-lg lg:text-2xl text-ellipsis line-clamp-2 h-10 sm:h-14 lg:h-16">
            {data.name}
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-6 sm:w-8 lg:w-10 aspect-square">
              <img
                src={data.host.host_picture_url}
                className="rounded-full object-cover"
                onError={(event) => handleImageError(event, DefaultProfile)}
              />
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-gray-500">
              {data.host.host_name}
            </div>
          </div>
        </div>
      }
      header={
        <div className="aspect-square">
          <img
            src={data.images.picture_url}
            alt={data.name}
            className="w-full h-full object-cover rounded-t"
            onError={handleImageError}
          />
        </div>
      }
      footer={
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-sm sm:text-base lg:text-lg">
            ${data.price}
          </h2>
          <Button className="ml-auto" label="Details" onClick={onDetails} />
        </div>
      }
    >
      <p className="text-xs sm:text-sm lg:text-base text-ellipsis line-clamp-4">
        {data.description}
      </p>
    </Card>
  );
};
