/* eslint-disable @typescript-eslint/no-explicit-any */
// FilterSection.tsx
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import { type FilterState } from './filterTypes';
import { type Product } from '../../services/apiProducts';
import { useState } from 'react';
import { getBrandOptions, getCategoryOptions } from './filterUtils';

interface FilterSectionProps {
  filterState: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  products: Product[];
}

function FilterSection({
  filterState,
  onApplyFilters,
  products,
}: FilterSectionProps) {
  const [inputFilters, setInputFilters] = useState<FilterState>(filterState);

  const handleInputChange = (key: keyof FilterState, value: any) => {
    setInputFilters((prev) => ({ ...prev, [key]: value }));
  };

  const categoryOptions = getCategoryOptions(products);
  const brandOptions = getBrandOptions(products);

  return (
    <div className="mb-6 flex flex-col items-center gap-4 md:flex-row md:gap-10">
      <Dropdown
        value={inputFilters.category}
        options={categoryOptions}
        onChange={(e: DropdownChangeEvent) =>
          handleInputChange('category', e.value)
        }
        className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 md:w-48"
        placeholder="Select a Category"
        valueTemplate={(option) => (
          <span className="p-2 text-lg text-text">
            {option ? option.label : 'Select a Category'}
          </span>
        )}
        itemTemplate={(option) => (
          <span className="text-xl">{option.label}</span>
        )}
      />

      <Dropdown
        value={inputFilters.brand}
        options={brandOptions}
        onChange={(e: DropdownChangeEvent) =>
          handleInputChange('brand', e.value)
        }
        placeholder="Select a Brand"
        className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 md:w-48"
        valueTemplate={(option) => (
          <span className="p-2 text-lg text-text">
            {option ? option.label : 'Select a Brand'}
          </span>
        )}
        itemTemplate={(option) => (
          <span className="text-xl">{option.label}</span>
        )}
      />

      <div className="flex items-center gap-2">
        <span>In Stock</span>
        <InputSwitch
          checked={inputFilters.inStock}
          onChange={(e) => handleInputChange('inStock', e.value)}
          className="custom-inputswitch"
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-sm">
          Price Range: ${inputFilters.priceRange[0]} - $
          {inputFilters.priceRange[1]}
        </span>
        <Slider
          value={inputFilters.priceRange}
          onChange={(e: SliderChangeEvent) =>
            handleInputChange('priceRange', e.value as [number, number])
          }
          className="custom-slider w-64"
          range
          min={0}
          max={5000}
        />
      </div>

      <button
        onClick={() => onApplyFilters(inputFilters)}
        className="hover:bg-secondary-dark mt-4 rounded-lg bg-secondary px-6 py-3 text-white transition duration-200"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default FilterSection;
