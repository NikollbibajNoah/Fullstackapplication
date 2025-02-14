import { Listing } from "../Listing";

export const getFavorites = (
  first: number = 0,
  rows: number = 10
): Listing[] => {
  const data: Listing[] = JSON.parse(localStorage.getItem("favorites") || "[]");

  const result: Listing[] = [];

  for (let i = first * rows; i < first * rows + rows; i++) {
    const item = data[i];

    if (!item) continue;

    result.push(item);
  }

  return result;
};

export const addFavorite = (listing: Listing) => {
  const data: Listing[] = JSON.parse(localStorage.getItem("favorites") || "[]");

  data.push(listing);
  localStorage.setItem("favorites", JSON.stringify(data));
};

export const removeFavorite = (listing: Listing) => {
  const listings: Listing[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  const updatedListings = listings.filter(
    (item: Listing) => item.id !== listing.id
  );

  localStorage.setItem("favorites", JSON.stringify(updatedListings));
};

export const isItemInLocalStorage = (id: string): boolean => {
  const listings: Listing[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  return listings.some((item: Listing) => item.id === id);
};

export const clearFavorites = () => {
  localStorage.clear();
};

export const getFavoritesCount = (): number => {
  const data: Listing[] = JSON.parse(localStorage.getItem("favorites") || "[]");

  return data.length;
};

// clearFavorites();
