import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getProductById, type Product } from '../services/apiProducts';
import { FaStar } from 'react-icons/fa';

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product details</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className="container mx-auto flex flex-wrap gap-8 p-6">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="mb-4 h-[460px] w-[460px] rounded-lg object-contain shadow-lg"
      />

      <div className="w-full md:w-1/2">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          {product.title}
        </h1>

        <p className="mb-4 text-lg text-gray-700">{product.description}</p>

        <div className="mb-4">
          <p className="text-lg text-gray-500">
            Discount:{' '}
            <span className="text-red-500">{product.discountPercentage}%</span>
          </p>
          <p className="text-lg text-gray-500">
            Availability:{' '}
            <span className="font-semibold">{product.availabilityStatus}</span>
          </p>
          <p className="text-lg text-gray-500">
            Return Policy: <span>{product.returnPolicy}</span>
          </p>
          <p className="text-lg text-gray-500">
            Brand: <span>{product.brand}</span>
          </p>
          <p className="text-lg text-gray-500">
            Warranty: <span>{product.warrantyInformation}</span>
          </p>
          <p className="text-lg text-gray-500">
            Shipping: <span>{product.shippingInformation}</span>
          </p>
        </div>

        <div className="mb-4">
          <p className="text-3xl font-semibold text-green-600">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="quantity"
            className="block text-lg font-medium text-gray-700"
          >
            Quantity
          </label>
          <select
            id="quantity"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {Array.from({ length: product.stock }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <span className="flex items-center text-lg font-semibold text-yellow-500">
            <FaStar className="mr-1" /> {product.rating} / 5
          </span>
        </div>

        <button className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-indigo-500 md:w-auto">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
