import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Listing } from "./Listing";
import axios from "axios";
import { Button } from "primereact/button";
import Dummy from "./assets/images/dummy.png";

export const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | undefined>(undefined);
  const [inspectedImage, setInspectedImage] = useState<string | undefined>(
    undefined
  );

  useEffect(
    function () {
      const fetchListing = async function () {
        try {
          const res = await axios.get(`http://localhost:8080/listings/${id}`);

          if (res.status === 200) {
            setListing(res.data);
            console.log(res.data);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchListing();
    },
    [id]
  );

  const inspectImage = () => {
    setInspectedImage(listing?.images.picture_url);
  };

  const clearInspectedImage = () => {
    setInspectedImage(undefined);
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = Dummy;
  };

  return (
    <div>
      <div className="flex flex-col gap-4 p-4">
        <div>
          <Button
            label="Back"
            onClick={function back() {
              navigate(-1);
            }}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-around gap-4 max-h-full">
          <div>
            <div>
              <h1 className="text-2xl font-bold">
                {listing?.name} - #{listing?.id}
              </h1>
              <p className="text-gray-500 lg:max-w-[500px]">
                {listing?.description}
              </p>
            </div>
            <div className="flex items-center gap-3 my-5">
              <h2 className="text-2xl font-semibold">${listing?.price}</h2>
            </div>
          </div>
          <div>
            <img
              src={listing?.images.picture_url}
              onError={handleImageError}
              className="w-full h-full object-cover rounded shadow cursor-pointer"
              onClick={inspectImage}
            />
          </div>
        </div>
        <div className="w-80"></div>
      </div>
      {inspectedImage && (
        <div className="fixed w-full h-screen bg-black bg-opacity-80 backdrop-blur-md left-0 top-0 flex flex-col">
          <div className="flex justify-end px-10 py-2">
            <Button
              icon="pi pi-times"
              label="Schliessen"
              rounded
              text
              onClick={clearInspectedImage}
            />
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={inspectedImage}
              alt={listing?.name}
              className="max-w-[90%]  object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
