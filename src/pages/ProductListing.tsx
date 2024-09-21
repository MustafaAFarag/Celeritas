import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '../services/apiProducts';
import ProductCard from '../ui/ProductCard';

function ProductListing() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[], Error>({
    queryKey: ['products', query], // Include query in queryKey
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (products && query) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  }, [products, query]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load products.</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-2xl font-semibold">
        Search Results for "{query}"
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="min-w-[220px]"
            />
          ))
        ) : (
          <p>No products found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default ProductListing;
