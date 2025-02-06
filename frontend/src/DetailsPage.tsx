import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Listing } from "./Listing";
import axios from "axios";
import { Button } from "primereact/button";

export const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | undefined>(undefined);

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

  return (
    <div className="flex gap-4">
      <div>
        <Button
          label="Back"
          onClick={function back() {
            navigate(-1);
          }}
        />
      </div>
      <div>
        <div>
          <h1 className="text-xl font-bold">{listing?.name}</h1>
          <p className="text-gray-500 w-[400px]">{listing?.description}</p>
        </div>
        <div className="flex items-center gap-3 my-5">
          <h2 className="text-2xl font-semibold">${listing?.price}</h2>
          <span> - </span>
          <span>{listing?.id}</span>
        </div>
      </div>
      <div className="w-80">
        <img
          src={listing?.images.picture_url}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
