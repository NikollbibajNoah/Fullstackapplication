import axios from "axios";
import { Listing } from "../Listing";
import { FilterOptionsProps } from "../components/FilterOptions";

const backendURL: string = import.meta.env.VITE_BACKEND_URL;
const listingsEndpoint: string = import.meta.env.VITE_LISTINGS_ENDPOINT;

const getListingsCount = async function (
  filterOptions?: FilterOptionsProps
): Promise<number | undefined> {
  try {
    const params = new URLSearchParams();

    if (filterOptions) {
      if (filterOptions.minPrice) {
        params.append("minPrice", filterOptions.minPrice.toString());
      }

      if (filterOptions.maxPrice) {
        params.append("maxPrice", filterOptions.maxPrice.toString());
      }
    }

    const url = `${backendURL}${listingsEndpoint}/count?${params.toString()}`;
    // console.log(url);

    const res = await axios.get(url);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const getListings = async function (
  first: number = 0,
  rows: number = 10
): Promise<Listing[] | undefined> {
  try {
    const res = await axios.get(
      `${backendURL}${listingsEndpoint}?page=${first}&size=${rows}`
    );

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const getListingsWithFilter = async function (
  first: number = 0,
  rows: number = 10,
  filterOptions?: FilterOptionsProps
): Promise<Listing[] | undefined> {
  try {
    const params = new URLSearchParams();

    params.append("page", first.toString());
    params.append("size", rows.toString());

    if (filterOptions) {
      if (filterOptions.minPrice) {
        params.append("minPrice", filterOptions.minPrice.toString());
      }

      if (filterOptions.maxPrice) {
        params.append("maxPrice", filterOptions.maxPrice.toString());
      }
    }

    // const url = `${backendURL}${listingsEndpoint}?${params.toString()}`;

    // console.log(url);

    const res = await axios.get(
      `${backendURL}${listingsEndpoint}?${params.toString()}`
    );

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

const getListingById = async function (
  id: string
): Promise<Listing | undefined> {
  try {
    const res = await axios.get(`${backendURL}${listingsEndpoint}/${id}`);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export { getListingsCount, getListings, getListingsWithFilter, getListingById };
