import { Product } from '../../services/apiProducts';
import { FaStar, FaTag } from 'react-icons/fa';

type ProductPaginatorProps = {
  products: Product[];
};

function ProductPaginator({ products }: ProductPaginatorProps) {
  const topProductsByStock = products
    ?.slice()
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 10);

  return (
    <section className="mb-5 overflow-x-auto rounded-lg bg-gray-200 px-4 pb-6">
      <h2 className="p-5 text-center text-3xl font-bold">Best Sellers</h2>
      <div className="flex space-x-6">
        {topProductsByStock?.map((product) => {
          const originalPrice = product.discountPercentage
            ? product.price / (1 - product.discountPercentage / 100)
            : product.price;

          return (
            <div
              key={product.id}
              className="min-w-[220px] rounded-lg bg-white p-4 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="mb-3 h-48 w-full rounded-lg object-contain"
              />
              <h3 className="mb-2 text-nowrap text-xl font-bold text-gray-800">
                {product.title}
              </h3>
              <div className="mb-3 flex justify-between text-lg">
                <span className="flex items-center text-yellow-500">
                  <FaStar className="mr-1 h-4 w-4" /> {product.rating}/5
                </span>
                <span className="flex items-center text-red-500">
                  <FaTag className="mr-1 h-4 w-4" />{' '}
                  {product.discountPercentage}%
                </span>
              </div>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg font-medium text-gray-500 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
                <span className="text-2xl font-semibold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProductPaginator;
