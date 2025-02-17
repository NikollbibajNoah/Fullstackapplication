import { useState } from "react";
import { FilterOptionsProps } from "../components/FilterOptions";

const initialFilterOptions: FilterOptionsProps = {
  minPrice: undefined,
  maxPrice: undefined,
};

export const useFilter = () => {
  const [filterOptions, setFilterOptions] =
    useState<FilterOptionsProps>(initialFilterOptions);




    return { filterOptions, setFilterOptions };
};
