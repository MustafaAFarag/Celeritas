import { useQuery } from '@tanstack/react-query';
import { fetchProducts, type Product } from '../services/apiProducts';
import Loader from '../ui/Loader';
import ErrorMessage from '../ui/ErrorMessage';

import ExclusiveOffer from '../features/homepage/ExclusiveOffer';
import ProductsUnder from '../features/homepage/ProductsUnder';
import DiscountProducts from '../features/homepage/DiscountProducts';
import RatedProduct from '../features/homepage/RatedProduct';
import Hero from '../features/homepage/Hero';
import ProductPaginator from '../features/homepage/ProductPaginator';

function Homepage() {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="container mx-auto bg-background p-4 text-text">
      {/* Hero Section*/}
      <Hero />
      {/* Offers Containers Section*/}
      <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <ProductsUnder products={products ?? []} />
        <DiscountProducts products={products ?? []} />
        <RatedProduct products={products ?? []} />
      </section>

      {/* Paginator Section*/}
      <ProductPaginator products={products ?? []} />

      {/* Exclusive Section*/}
      <ExclusiveOffer />
    </div>
  );
}

export default Homepage;
