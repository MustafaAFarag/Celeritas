import { useNavigate } from 'react-router-dom';
import { type Product } from '../services/apiProducts';
import { FaStar, FaTag } from 'react-icons/fa';
import { MouseEvent } from 'react';
import toast from 'react-hot-toast';

type ProductCardListingProps = {
  product: Product;
  className?: string;
  onAddToCart: (product: Product) => void; // New prop for adding to cart
};

function ProductCardListing({
  product,
  className,
  onAddToCart,
}: ProductCardListingProps) {
  const navigate = useNavigate();
  const originalPrice = product.discountPercentage
    ? product.price / (1 - product.discountPercentage / 100)
    : product.price;

  const handleCardClick = () => {
    navigate(`/product-detail?productId=${product.id}`);
  };

  const handleAddToCartClick = (e: MouseEvent) => {
    e.stopPropagation(); // Prevent the card click event from firing
    onAddToCart(product); // Call the onAddToCart function passed from the parent component
    toast.success(`${product.title} has been added to your cart!`); // Show toast notification
  };

  return (
    <div
      onClick={handleCardClick}
      className={`rounded-lg border bg-white p-6 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-2xl dark:bg-gray-800 ${className}`}
    >
      {/* Product Image */}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="mb-4 h-40 w-full rounded-lg object-contain transition-transform duration-200"
      />

      {/* Product Title */}
      <h3 className="mb-2 flex items-center gap-2 truncate text-xl font-bold text-gray-800 dark:text-gray-200">
        <span className="h-4 w-4 rounded-full bg-green-400"></span>
        {product.title}
      </h3>

      {/* Rating and Discount */}
      <div className="mb-3 flex justify-between text-lg">
        <span className="flex items-center text-yellow-500">
          <FaStar className="mr-1 h-4 w-4 -translate-y-0.5" /> {product.rating}
          /5
        </span>
        <span className="flex items-center text-red-500">
          <FaTag className="mr-1 h-4 w-4" /> {product.discountPercentage}%
        </span>
      </div>

      {/* Pricing and Category */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium text-gray-500 line-through">
            ${originalPrice.toFixed(2)}
          </span>
          <span className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col items-end justify-end">
          <span className="text-base text-gray-500 dark:text-gray-400">
            {product.brand}
          </span>
          <span className="text-base text-gray-500 dark:text-gray-400">
            {product.category}
          </span>
        </div>
      </div>

      <button
        onClick={handleAddToCartClick}
        className="mt-3 w-full rounded-md bg-blue-500 py-2 font-semibold text-white transition duration-200 ease-in-out hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCardListing;
