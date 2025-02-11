import axios from "axios";
import { Listing } from "../Listing";

const backendURL: string = import.meta.env.VITE_BACKEND_URL;
const listingsEndpoint: string = import.meta.env.VITE_LISTINGS_ENDPOINT;

const getListingsCount = async function (): Promise<number | undefined> {
  try {
    const res = await axios.get(`${backendURL}${listingsEndpoint}/count`);

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

export { getListingsCount, getListings, getListingById };
