import { Product } from '../../services/apiProducts';
import ProductCard from '../../ui/ProductCard';

type ProductPaginatorProps = {
  products: Product[];
};

function ProductPaginator({ products }: ProductPaginatorProps) {
  const topProductsByStock = products
    ?.slice()
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 10);

  return (
    <>
      <h2 className="text-nochange-text bg-nochange-background p-5 text-center text-3xl font-bold">
        Best Sellers
      </h2>
      <section className="bg-nochange-background mb-5 overflow-x-auto rounded-lg px-4 pb-6">
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

export default ProductPaginator;
