import axios from "axios";
import { useEffect, useState } from "react";
import { Listing } from "./Listing";
import { CardGrid } from "./components";
import { Paginator } from "primereact/paginator";

export const ListingsPage = () => {
  const [listings, setListings] = useState<Listing[] | undefined>([]);
  const [listingsCount, setListingsCount] = useState<number>(0);
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);

  useEffect(() => {
    const fetchListingsCount = async function () {
      try {
        const res = await axios.get("http://localhost:8080/listings/count");

        if (res.status === 200) {
          console.log(res.data);
          setListingsCount(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchListingsCount();
  }, []);

  useEffect(
    function () {
      const fetchListings = async function () {
        try {
          const res = await axios.get(
            `http://localhost:8080/listings?page=${first}&size=${rows}`
          );

          if (res.status === 200) {
            setListings(res.data);
            console.log(res.data);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchListings();
    },
    [first, rows]
  );

  const onPageChange = function (event: { first: number; rows: number }) {
    setFirst(event.first / event.rows);
    setRows(event.rows);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="p-12 relative">
        {listings ? (
          <>
            <CardGrid data={listings} />
            <Paginator
              first={first * rows}
              rows={rows}
              totalRecords={listingsCount}
              rowsPerPageOptions={[10, 20, 30]}
              onPageChange={onPageChange}
            />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
