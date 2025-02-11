import { useEffect, useRef, useState } from "react";
import { Listing } from "./Listing";
import { CardGrid } from "./components";
import { Paginator } from "primereact/paginator";
import { getListings, getListingsCount } from "./service/ListingService";
import { useLocation } from "react-router-dom";

export const ListingsPage = () => {
  const location = useLocation();
  const [listings, setListings] = useState<Listing[] | undefined>([]);
  const [listingsCount, setListingsCount] = useState<number>(0);
  const [first, setFirst] = useState<number>(location.state?.first || 0);
  const [rows, setRows] = useState<number>(location.state?.rows || 10);
  const scrollPositionRef = useRef<number>(location.state?.scrollPosition || 0);

  useEffect(() => {
    const fetchListingsCount = async function () {
      const data = await getListingsCount();

      if (data) {
        setListingsCount(data);
      }
    };

    fetchListingsCount();
  }, []);

  useEffect(
    function () {
      const fetchListings = async function () {
        const data = await getListings(first, rows);

        if (data) {
          setListings(data);

          window.scrollTo({
            top: scrollPositionRef.current,
            behavior: "smooth",
          });
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
    scrollPositionRef.current = 0; //Reset scroll height on new page
  };

  return (
    <div>
      <div className="p-12 relative">
        {listings ? (
          <>
            <CardGrid data={listings} page={first} rows={rows} />
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
