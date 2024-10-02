import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, useCallback } from 'react';
import { fetchProducts, Product } from '../services/apiProducts';
import {
  type FilterState,
  initialFilterState,
} from '../features/ProductListing/filterTypes';
import { filterProducts } from '../features/ProductListing/filterUtils';
import FilterSection from '../features/ProductListing/FilterSection';
import ProductGrid from '../features/ProductListing/ProductGrid';
import PaginationSection from '../features/ProductListing/PaginationSection';
import toast from 'react-hot-toast';

function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  console.log(searchParams)

  const query = searchParams.get('query') || '';
  const [filterState, setFilterState] = useState<FilterState>(() =>
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
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  let category = filterState.category || searchParams.get('category');
  const brand = filterState.brand || searchParams.get('brand');

  if (category === 'all-category') {
    category = 'all categories';
  }

  const applyFilters = useCallback(() => {
    if (products) {
      const filtered = filterProducts(products, query, filterState);
      setFilteredProducts(filtered);
      setCurrentPage(1);
    }
  }, [products, query, filterState]);

  useEffect(() => {
    const initFilters = initialFilterState(searchParams);
    setFilterState(initFilters);
  }, [searchParams]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  function handleApplyFilters(newFilters: FilterState) {
    setFilterState((prevState) => ({
      ...prevState,
      ...newFilters,
    }));
    updateSearchParams(newFilters);
    toast.success('Filters have been applied');
  }

  function updateSearchParams(filters: FilterState) {
    const params = new URLSearchParams(searchParams);

    if (query) params.set('query', query);

    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'priceRange' && Array.isArray(value)) {
        // Ensure value is an array
        params.set('minPrice', String(value[0]));
        params.set('maxPrice', String(value[1]));
      } else {
        // Assuming initialFilterState() returns the correct initial value for the respective key
        if (value !== initialFilterState()[key as keyof FilterState]) {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
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
            {query
              ? `Search Results for "${query}"`
              : category
                ? `Products for ${category}`
                : brand
                  ? `Products for ${brand}`
                  : 'All Products'}
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
