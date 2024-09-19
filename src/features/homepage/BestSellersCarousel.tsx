import { Product } from '../../services/apiProducts';
import ProductCard from '../../ui/ProductCard';

type BestSellersCarouselProps = {
  products: Product[];
};

function BestSellersCarousel({ products }: BestSellersCarouselProps) {
  const topProductsByStock = products
    ?.slice()
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 10);

  return (
    <>
      <h2 className="bg-sellers-background rounded-t-lg p-5 text-center text-3xl font-bold text-nochange-text">
        Best Sellers
      </h2>
      <section className="bg-sellers-background mb-5 overflow-x-auto rounded-b-lg px-4 pb-6">
        <div className="flex space-x-6">
          {topProductsByStock?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="min-w-[220px]"
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default BestSellersCarousel;
