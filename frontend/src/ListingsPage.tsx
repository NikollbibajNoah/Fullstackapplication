import axios from "axios";
import { useEffect, useState } from "react";
import { Listing } from "./Listings";
import { DataView } from "primereact/dataview";
import { useNavigate } from "react-router-dom";

export const ListingsPage = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[] | undefined>([]);

  useEffect(function () {
    const fetchListings = async function () {
      try {
        const res = await axios.get("http://localhost:8080/listings");

        if (res.status === 200) {
          setListings(res.data);
          console.log(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchListings();
  }, []);

  const itemTemplate = function (listing: Listing) {
    return (
      <div
        className="col-12 my-2 cursor-pointer"
        key={listing.id}
        onClick={function () {
          navigate(`/listings/${listing.id}`);
        }}
      >
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 shadow rounded">
          <div className="w-16 aspect-square ">
            <img
              className="object-cover w-full h-full"
              src={listing.images.picture_url}
              alt={listing.name}
            />
          </div>
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-col w-80 align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{listing.name}</div>
              <div className="max-h-32 text-ellipsis line-clamp-3 text-xs">
                {listing.description}
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">${listing.price}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DataView value={listings} itemTemplate={itemTemplate} paginator rows={3} />
  );
};
