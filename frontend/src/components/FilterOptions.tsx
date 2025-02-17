import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { Panel } from "primereact/panel";
import { useRef } from "react";
import { useFilter } from "../hooks";
import { Button } from "primereact/button";

export interface FilterOptionsProps {
  minPrice: number | undefined;
  maxPrice: number | undefined;
}

export const FilterOptions = ({
  onUpdateFilter,
}: {
  onUpdateFilter?: (filterOptions: FilterOptionsProps) => void;
}) => {
  const ref = useRef<Panel>(null);
  const { filterOptions, setFilterOptions } = useFilter();

  const handleMinPriceChange = (value: number | undefined) => {
    setFilterOptions((prev) => ({
      ...prev,
      minPrice: value,
    }));
  };

  const handleMaxPriceChange = (value: number | undefined) => {
    setFilterOptions((prev) => ({
      ...prev,
      maxPrice: value,
    }));
  };

  const handleClearPriceFilter = () => {
    setFilterOptions((prev) => {
      const updatedFilterOptions = {
        ...prev,
        maxPrice: undefined,
        minPrice: undefined,
      };

      if (onUpdateFilter) {
        onUpdateFilter(updatedFilterOptions);
      }

      return updatedFilterOptions;
    });
  };

  return (
    <Panel className="my-3" toggleable header="Filter" ref={ref}>
      <div className="p-2 flex gap-3 overflow-x-auto">
        <div>
          <h3 className="text-lg py-2">Preis</h3>
          <div className="flex gap-3">
            <InputNumber
              value={filterOptions.minPrice}
              onChange={(e: InputNumberChangeEvent) =>
                handleMinPriceChange(e.value ?? undefined)
              }
              min={0}
              placeholder="Min"
            />
            <InputNumber
              value={filterOptions.maxPrice}
              min={1}
              onChange={(e: InputNumberChangeEvent) =>
                handleMaxPriceChange(e.value ?? undefined)
              }
              placeholder="Max"
            />
            <Button
              icon="pi pi-filter-slash"
              severity="danger"
              onClick={handleClearPriceFilter}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <Button
          label="Übernehmen"
          onClick={() => onUpdateFilter && onUpdateFilter(filterOptions)}
        />
      </div>
    </Panel>
  );
};
