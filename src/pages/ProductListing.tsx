import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '../services/apiProducts';
import ProductCardListing from '../ui/ProductCardListing';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { Slider, SliderChangeEvent } from 'primereact/slider';

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

  // Filter input states (these states change based on user input)
  const [inputCategory, setInputCategory] = useState<string>(initialCategory);
  const [inputBrand, setInputBrand] = useState<string>(initialBrand);
  const [inputInStock, setInputInStock] = useState<boolean>(initialInStock);
  const [inputPriceRange, setInputPriceRange] =
    useState<[number, number]>(initialPriceRange);

  // Applied filter states (these states are updated only when filters are applied)
  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [inStock, setInStock] = useState<boolean>(initialInStock);
  const [priceRange, setPriceRange] =
    useState<[number, number]>(initialPriceRange);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Fetch products
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[], Error>({
    queryKey: ['products', query],
    queryFn: fetchProducts,
  });

  console.log(selectedCategory);

  // Filter products based on applied filter states
  useEffect(() => {
    if (products) {
      const filtered = products.filter((product) => {
        const matchesQuery = product.title
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory = selectedCategory
          ? product.category.toLowerCase() === selectedCategory?.toLowerCase()
          : true;
        const matchesBrand = selectedBrand
          ? product.brand?.toLowerCase().includes(selectedBrand.toLowerCase())
          : true;
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
    setSelectedCategory(inputCategory);
    setSelectedBrand(inputBrand);
    setInStock(inputInStock);
    setPriceRange(inputPriceRange);

    // Update the URL search parameters
    const params = new URLSearchParams(searchParams);
    if (query) params.set('query', query);
    if (inputCategory) {
      params.set('category', inputCategory);
    } else {
      params.delete('category');
    }
    if (inputBrand) {
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

  // Create unique dropdown options
  const categories = Array.from(
    new Set(products?.map((product) => product.category) || []),
  );
  const brands = Array.from(
    new Set(products?.map((product) => product.brand) || []),
  );

  const categoryDropdownOptions = [
    { label: 'All Categories', value: '' },
    ...categories.map((category) => ({ label: category, value: category })),
  ];

  const brandDropdownOptions = [
    { label: 'All Brands', value: '' },
    ...brands.map((brand) => ({ label: brand, value: brand })),
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
            valueTemplate={(option) => (
              <span className="p-2 text-lg text-text">
                {option ? option.label : 'Select a Category'}
              </span> //
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
              </span> //
            )}
            itemTemplate={(option) => (
              <span className="text-xl">{option.label}</span>
            )}
          />

          <div className="flex items-center gap-2">
            <span>In Stock</span>
            <InputSwitch
              checked={inputInStock}
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
              className="w-64"
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
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCardListing
              key={product.id}
              product={product}
              className="min-w-[220px]"
            />
          ))
        ) : (
          <p className="col-span-full text-center">
            No products found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductListing;
