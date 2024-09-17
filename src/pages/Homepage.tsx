import { useQuery } from '@tanstack/react-query';
import { fetchProducts, type Product } from '../services/apiProducts';
import Loader from '../ui/Loader';
import ErrorMessage from '../ui/ErrorMessage';

import ExclusiveOffer from '../features/homepage/ExclusiveOffer';
import ProductsUnder from '../features/homepage/ProductsUnder';
import DiscountProducts from '../features/homepage/DiscountProducts';
import RatedProduct from '../features/homepage/RatedProduct';
import Hero from '../features/homepage/Hero';

function Homepage() {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const getImageUrl = (category: string) => {
    switch (category) {
      case 'beauty':
        return './beauty.jpg';
      case 'furniture':
        return './couch.jpg';
      default:
        return './download.jfif';
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="container mx-auto bg-background p-4 text-text">
      <Hero />

      <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <ProductsUnder products={products ?? []} getImageUrl={getImageUrl} />
        <DiscountProducts products={products ?? []} getImageUrl={getImageUrl} />
        <RatedProduct products={products ?? []} getImageUrl={getImageUrl} />
      </section>

      <ExclusiveOffer />
    </div>
  );
}

export default Homepage;
