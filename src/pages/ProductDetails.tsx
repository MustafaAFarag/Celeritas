import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getProductById, type Product } from '../services/apiProducts';
import { FaStar, FaTag } from 'react-icons/fa';
import CustomRating from '../ui/CustomRating';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function ProductDetails() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<Product, Error>({
    queryKey: ['product', productId],
    queryFn: () => getProductById(Number(productId)),
    enabled: !!productId,
  });

  const [userRating, setUserRating] = useState<number>(0);

  useEffect(
    function () {
      if (product) {
        setUserRating(product.rating);
      }
    },
    [product],
  );
  function handleRatingChange(newRating: number) {
    setUserRating(newRating);
    toast.success('Rating will not change as I am using a Dummy API');
  }

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-lg text-red-500">
        Error loading product details
      </div>
    );
  if (!product)
    return <div className="text-center text-lg">No product found</div>;

  return (
    <div className="container mx-auto mt-10 flex flex-wrap gap-8 rounded-lg p-6 shadow-lg">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="mb-4 h-[460px] w-[460px] rounded-lg object-contain shadow-lg transition-transform duration-300 hover:scale-105"
      />

      <div className="w-full space-y-6 md:w-1/2">
        <h1 className="text-4xl font-bold text-text">{product.title}</h1>

        <p className="text-lg text-text">{product.description}</p>

        <div className="space-y-2 text-xl text-text">
          <p>
            Availability:{' '}
            <span className="font-semibold text-green-600">
              {product.availabilityStatus}
            </span>
          </p>
          <p>
            Return Policy:{' '}
            <span className="font-semibold">{product.returnPolicy}</span>
          </p>
          <p>
            Brand: <span className="font-semibold">{product.brand}</span>
          </p>
          <p>
            Warranty:{' '}
            <span className="font-semibold">{product.warrantyInformation}</span>
          </p>
          <p>
            Shipping:{' '}
            <span className="font-semibold">{product.shippingInformation}</span>
          </p>
        </div>

        <div className="space-y-2">
          <p className="flex items-center gap-2 text-lg text-text">
            <FaTag className="text-red-500" /> Discount:{' '}
            <span className="font-bold text-red-500">
              {product.discountPercentage}%
            </span>
          </p>
          <p className="text-3xl font-bold text-green-600">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="block text-lg font-semibold text-text"
          >
            Quantity
          </label>
          <select
            id="quantity"
            className="mt-1 w-24 rounded-md border-gray-300 bg-background text-xl text-text shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {Array.from({ length: product.stock }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-4">
          <span className="flex items-center text-xl font-semibold text-yellow-500">
            <FaStar className="mr-1 h-6 w-6 -translate-y-1" /> {product.rating}{' '}
            / 5
          </span>
          <CustomRating
            value={Math.floor(userRating)}
            onChange={handleRatingChange}
            max={5}
          />
        </div>

        <button className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-indigo-300 md:w-auto">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
