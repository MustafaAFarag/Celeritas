// ProductListing.tsx
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '../services/apiProducts';
import {
  type FilterState,
  initialFilterState,
} from '../features/ProductListing/filterTypes';
import { filterProducts } from '../features/ProductListing/filterUtils';
import FilterSection from '../features/ProductListing/FilterSection';
import ProductGrid from '../features/ProductListing/ProductGrid';
import PaginationSection from '../features/ProductListing/PaginationSection';

function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get('query') || '';
  const [filterState, setFilterState] = useState<FilterState>(
    initialFilterState(searchParams),
  );
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 12;

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[], Error>({
    queryKey: ['products', query],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (products) {
      const filtered = filterProducts(products, query, filterState);
      setFilteredProducts(filtered);
    }
  }, [products, query, filterState]);

  function handleApplyFilters(newFilters: FilterState) {
    setFilterState(newFilters);
    updateSearchParams(newFilters);
  }

  function updateSearchParams(filters: FilterState) {
    const params = new URLSearchParams(searchParams);
    if (query) params.set('query', query);
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== initialFilterState()[key as keyof FilterState]) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });
    setSearchParams(params);
    navigate(`/products?${params.toString()}`);
  }

  if (isLoading) return <div className="py-4 text-center">Loading...</div>;
  if (isError)
    return (
      <div className="py-4 text-center text-red-600">
        Failed to load products.
      </div>
    );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto flex-grow p-4">
        <div className="flex items-center justify-between">
          <h2 className="mb-6 text-2xl font-semibold">
            {query ? `Search Results for "${query}"` : 'All Products'}
          </h2>

          <FilterSection
            filterState={filterState}
            onApplyFilters={handleApplyFilters}
            products={products || []}
          />
        </div>

        <ProductGrid products={currentProducts} />
      </div>

      <PaginationSection
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={filteredProducts.length}
        productsPerPage={productsPerPage}
      />
    </div>
  );
}

export default ProductListing;
