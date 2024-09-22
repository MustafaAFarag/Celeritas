import { type Product } from '../../services/apiProducts';
import { type FilterState } from './filterTypes';

export function filterProducts(
  products: Product[],
  query: string,
  filters: FilterState,
): Product[] {
  return products.filter((product) => {
    const matchesQuery = product.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesCategory =
      filters.category === '' || filters.category === 'all-category'
        ? true
        : product.category.toLowerCase() === filters.category.toLowerCase();
    const matchesBrand =
      filters.brand === '' || filters.brand === 'all-brand'
        ? true
        : product.brand?.toLowerCase().includes(filters.brand.toLowerCase());
    const matchesStock = !filters.inStock || product.stock > 0;
    const matchesPriceRange =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];

    return (
      matchesQuery &&
      matchesCategory &&
      matchesBrand &&
      matchesStock &&
      matchesPriceRange
    );
  });
}

export function getCategoryOptions(products: Product[]) {
  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  );
  return [
    { label: 'All Categories', value: 'all-category' },
    ...categories.map((category) => ({ label: category, value: category })),
  ];
}

export function getBrandOptions(products: Product[]) {
  const brands = Array.from(new Set(products.map((product) => product.brand)));
  return [
    { label: 'All Brands', value: 'all-brand' },
    ...brands.map((brand) => ({ label: brand, value: brand })),
  ];
}
