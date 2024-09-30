export type FilterState = {
  category: string;
  brand: string;
  inStock: boolean;
  priceRange: [number, number];
};

export const initialFilterState = (
  searchParams?: URLSearchParams,
): FilterState => ({
  category: searchParams?.get('category') || '',
  brand: searchParams?.get('brand') || '',
  inStock: searchParams?.get('inStock') === 'true',
  priceRange: [
    Number(searchParams?.get('minPrice')) || 0,
    Number(searchParams?.get('maxPrice')) || 40000,
  ],
});
