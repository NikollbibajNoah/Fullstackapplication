import { Paginator } from "primereact/paginator";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CardGrid } from "../components";
import { Listing } from "../Listing";
import { getFavorites, getFavoritesCount } from "../service/FavoriteService";

export const FavoritesPage = () => {
  const location = useLocation();
  const [listings, setListings] = useState<Listing[] | undefined>([]);
  const [listingsCount, setListingsCount] = useState<number>(0);
  const [first, setFirst] = useState<number>(location.state?.first || 0);
  const [rows, setRows] = useState<number>(location.state?.rows || 10);
  const scrollPositionRef = useRef<number>(location.state?.scrollPosition || 0);

  const fetchListingsCount = function () {
    const data = getFavoritesCount();

    if (data) {
      setListingsCount(data);
    }
  };

  useEffect(() => {
    fetchListingsCount();
  }, []);

  const fetchListings = function () {
    const data = getFavorites(first, rows);

    if (data) {
      console.log("Favorites:", data);

      setListings(data);
    }
  };

  useEffect(
    function () {
      fetchListings();
    },
    [first, rows]
  );

  useEffect(() => {
    window.scrollTo({ top: scrollPositionRef.current, behavior: "smooth" });
  }, [listings]);

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
          listings.length > 0 ? (
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
            <p>Du hast keine Favoriten ausgewählt!</p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
