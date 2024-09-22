/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '../services/apiProducts';
import ProductCardListing from '../ui/ProductCardListing';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Query Parameters
  const query = searchParams.get('query') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialBrand = searchParams.get('brand') || '';
  const initialInStock = searchParams.get('inStock') === 'true';
  const initialPriceRange: [number, number] = [
    Number(searchParams.get('minPrice')) || 0,
    Number(searchParams.get('maxPrice')) || 5000,
  ];

  // Filter input states
  const [inputCategory, setInputCategory] = useState<string>(initialCategory);
  const [inputBrand, setInputBrand] = useState<string>(initialBrand);
  const [inputInStock, setInputInStock] = useState<boolean>(initialInStock);
  const [inputPriceRange, setInputPriceRange] =
    useState<[number, number]>(initialPriceRange);

  // Applied filter states
  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [inStock, setInStock] = useState<boolean>(initialInStock);
  const [priceRange, setPriceRange] =
    useState<[number, number]>(initialPriceRange);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 12;

  // Fetch products
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[], Error>({
    queryKey: ['products', query],
    queryFn: fetchProducts,
  });

  // Filter products based on applied filter states
  useEffect(() => {
    if (products) {
      const filtered = products.filter((product) => {
        const matchesQuery = product.title
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory =
          selectedCategory === '' || selectedCategory === 'all-category'
            ? true
            : product.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesBrand =
          selectedBrand === '' || selectedBrand === 'all-brand'
            ? true
            : product.brand
                ?.toLowerCase()
                .includes(selectedBrand.toLowerCase());
        const matchesStock = inStock ? product.stock > 0 : true;
        const matchesPriceRange =
          product.price >= priceRange[0] && product.price <= priceRange[1];

        return (
          matchesQuery &&
          matchesCategory &&
          matchesBrand &&
          matchesStock &&
          matchesPriceRange
        );
      });
      setFilteredProducts(filtered);
    }
  }, [products, query, selectedCategory, selectedBrand, inStock, priceRange]);

  // Handle the application of filters
  function handleApplyFilters() {
    setSelectedCategory(inputCategory === 'all-category' ? '' : inputCategory);
    setSelectedBrand(inputBrand === 'all-brand' ? '' : inputBrand);
    setInStock(inputInStock);
    setPriceRange(inputPriceRange);

    const params = new URLSearchParams(searchParams);
    if (query) params.set('query', query);
    if (inputCategory && inputCategory !== 'all-category') {
      params.set('category', inputCategory);
    } else {
      params.delete('category');
    }
    if (inputBrand && inputBrand !== 'all-brand') {
      params.set('brand', inputBrand);
    } else {
      params.delete('brand');
    }
    if (inputInStock) {
      params.set('inStock', String(inputInStock));
    } else {
      params.delete('inStock');
    }
    params.set('minPrice', String(inputPriceRange[0]));
    params.set('maxPrice', String(inputPriceRange[1]));
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

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const paginatorTemplate = {
    layout: 'PrevPageLink PageLinks NextPageLink',
    PageLinks: (options: any) => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = `${options.className} p-1`;
        return (
          <span className={className} style={{ userSelect: 'none' }}>
            ...
          </span>
        );
      }

      return (
        <button
          type="button"
          className={`${options.className} ${
            options.page === currentPage - 1
              ? 'ring-2 ring-blue-500 ring-offset-2'
              : 'hover:bg-primary'
          } transition-all duration-150`}
          onClick={options.onClick}
        >
          {options.page + 1}
        </button>
      );
    },
  };

  // Create unique dropdown options
  const filteredCategories = Array.from(
    new Set(filteredProducts.map((product) => product.category)),
  );
  const filteredBrands = Array.from(
    new Set(filteredProducts.map((product) => product.brand)),
  );

  const categoryDropdownOptions = [
    { label: 'All Categories', value: 'all-category' },
    ...filteredCategories.map((category) => ({
      label: category,
      value: category,
    })),
  ];

  const brandDropdownOptions = [
    { label: 'All Brands', value: 'all-brand' },
    ...filteredBrands.map((brand) => ({ label: brand, value: brand })),
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-semibold">
          {query ? `Search Results for "${query}"` : ''}
        </h2>

        {/* Filter Section */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-10">
          <Dropdown
            value={inputCategory}
            options={categoryDropdownOptions}
            onChange={(e: DropdownChangeEvent) => setInputCategory(e.value)}
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
            value={inputBrand}
            options={brandDropdownOptions}
            onChange={(e: DropdownChangeEvent) => setInputBrand(e.value)}
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
              checked={inputInStock}
              className="custom-inputswitch"
              onChange={(e) => setInputInStock(e.value)}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm">
              Price Range: ${inputPriceRange[0]} - ${inputPriceRange[1]}
            </span>
            <Slider
              value={inputPriceRange}
              onChange={(e: SliderChangeEvent) =>
                setInputPriceRange(e.value as [number, number])
              }
              className="custom-slider w-64"
              range
              min={0}
              max={5000}
            />
          </div>

          <button
            onClick={handleApplyFilters}
            className="hover:bg-secondary-dark mt-4 rounded-lg bg-secondary px-6 py-3 text-white transition duration-200"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Display Products */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCardListing
              key={product.id}
              product={product}
              className="min-w-[220px]"
            />
          ))
        ) : (
          <div className="col-span-full mt-6 text-center text-lg text-text">
            No products match your search criteria.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Paginator
          first={indexOfFirstProduct}
          rows={productsPerPage}
          totalRecords={filteredProducts.length}
          onPageChange={(e: PaginatorPageChangeEvent) =>
            setCurrentPage(e.page + 1)
          }
          className="rounded-lg bg-background p-4 text-text shadow-lg"
          template={paginatorTemplate}
        />
      </div>
    </div>
  );
}

export default ProductListing;
