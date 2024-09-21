import { type Product } from '../services/apiProducts';
import { FaStar, FaTag } from 'react-icons/fa';

type ProductCardProps = {
  product: Product;
  className?: string;
};

function ProductCard({ product, className }: ProductCardProps) {
  const originalPrice = product.discountPercentage
    ? product.price / (1 - product.discountPercentage / 100)
    : product.price;

  return (
    <div
      className={`rounded-lg border bg-background p-6 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl ${className} `}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="-hover:scale-110 mb-4 h-40 w-full rounded-lg object-contain transition-transform duration-200"
      />
      <h3 className="mb-2 truncate text-xl font-bold text-text">
        {product.title}
      </h3>

      <div className="mb-3 flex justify-between text-lg">
        <span className="flex items-center text-yellow-500">
          <FaStar className="mr-1 h-4 w-4 -translate-y-0.5" /> {product.rating}
          /5
        </span>
        <span className="flex items-center text-red-500">
          <FaTag className="mr-1 h-4 w-4" /> {product.discountPercentage}%
        </span>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium text-gray-500 line-through">
            ${originalPrice.toFixed(2)}
          </span>
          <span className="text-2xl font-semibold text-text">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <span className="text-base text-gray-500">{product.category}</span>
      </div>
    </div>
  );
}

export default ProductCard;
