import { useEffect, useRef, useState } from "react";
import { Paginator } from "primereact/paginator";
import { useLocation } from "react-router-dom";
import { CardGrid, FilterOptions } from "../components";
import { Listing } from "../Listing";
import {
  getListingsCount,
  getListingsWithFilter,
} from "../service/ListingService";
import { FilterOptionsProps } from "../components/FilterOptions";

export const ListingsPage = () => {
  const location = useLocation();
  const [listings, setListings] = useState<Listing[] | undefined>([]);
  const [listingsCount, setListingsCount] = useState<number>(0);
  const [first, setFirst] = useState<number>(location.state?.first || 0);
  const [rows, setRows] = useState<number>(location.state?.rows || 10);
  const scrollPositionRef = useRef<number>(location.state?.scrollPosition || 0);
  const [filterOptions, setFilterOptions] = useState<
    FilterOptionsProps | undefined
  >(undefined);
  const prevFilterOptions = useRef(JSON.stringify(filterOptions));

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
    prevFilterOptions.current = JSON.stringify(filterOptions);
  }, [filterOptions]);

  useEffect(() => {
    const fetchListings = async (
      first: number,
      rows: number,
      filter?: FilterOptionsProps
    ) => {
      const data = await getListingsWithFilter(first, rows, filter);

      if (data) {
        setListings(data);

        if (
          JSON.stringify(prevFilterOptions.current) ===
          JSON.stringify(filterOptions)
        ) {
          handleScroll(scrollPositionRef.current);
        } else {
          handleScroll(0);
        }
      }
    };

    fetchListings(first, rows, filterOptions);
  }, [first, rows, filterOptions]);

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
    setFilterOptions(filterOptions);
  };

  return (
    <div>
      <div className="px-12 py-6 relative">
        {listings ? (
          <>
            <FilterOptions onUpdateFilter={onUpdateFilter} />
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
