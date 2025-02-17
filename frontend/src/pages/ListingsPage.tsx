import { useEffect, useRef, useState } from "react";
import { Paginator } from "primereact/paginator";
import { useLocation } from "react-router-dom";
import { CardGrid, FilterOptions } from "../components";
import { Listing } from "../Listing";
import { getListingsCount, getListings } from "../service/ListingService";
import { FilterOptionsProps } from "../components/FilterOptions";

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

  useEffect(() => {
    const fetchListings = async (
      first: number,
      rows: number,
    ) => {
      const data = await getListings(first, rows);

      if (data) {
        setListings(data);

        handleScroll(scrollPositionRef.current);
      }
    };

    fetchListings(first, rows);
  }, [first, rows]);

  const handleScroll = (position: number) => {
    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  const onPageChange = function (event: { first: number; rows: number }) {
    setFirst(event.first / event.rows);
    setRows(event.rows);

    handleScroll(0);
    scrollPositionRef.current = 0; //Reset scroll height on new page
  };

  const onUpdateFilter = (filterOptions: FilterOptionsProps) => {
    console.log("Updating");

    const fetchListings = async (
      first: number,
      rows: number,
      filter?: FilterOptionsProps
    ) => {
      const data = await getListings(first, rows);

      if (data) {
        let filterData = data;

        if (filter) {
          if (filter.minPrice && filter.maxPrice) {
            filterData = data.filter((listing: Listing) => {
              if (
                filter.minPrice !== undefined &&
                filter.maxPrice !== undefined &&
                listing.price >= filter.minPrice &&
                listing.price <= filter.maxPrice
              ) {
                return listing;
              }
            });
          }
        }

        setListings(filterData);
        handleScroll(0);
      }
    };

    fetchListings(first, rows, filterOptions);
  };

  return (
    <div>
      <div className="px-12 py-6 relative">
        {listings ? (
          <>
            <FilterOptions
              onUpdateFilter={onUpdateFilter}
            />
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
