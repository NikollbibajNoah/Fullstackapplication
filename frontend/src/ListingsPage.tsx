import axios from "axios";
import { useEffect, useState } from "react";
import { Listing } from "./Listing";
import { DataScroller } from "primereact/datascroller";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

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
      <div className="col-12" key={listing.id}>
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <div className="w-24 h-20 ">
            <img
              className="object-cover w-full h-full rounded shadow"
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
        <div className="flex py-4">
          <div className="ml-auto">
            <Button
              label="Details"
              onClick={function () {
                navigate(`/listings/${listing.id}`);
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="card max-w-[600px] mx-auto my-8">
        <DataScroller
          value={listings}
          itemTemplate={itemTemplate}
          rows={5}
          inline
          scrollHeight="500px"
          header="Scroll Down to Load More"
        />
      </div>
    </div>
  );
};
