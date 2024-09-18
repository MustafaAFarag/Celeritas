import { Link } from 'react-router-dom';
import { Product } from '../../services/apiProducts';
import { IconType } from 'react-icons';
import { FaStar, FaTag } from 'react-icons/fa';

type ProductListProps = {
  products: Product[];
  getImageUrl: (category: string) => string;
  title: string;
  Icon: IconType;
  iconColor: string;
  filterProducts: (products: Product[]) => Product[];
  linkTo: string;
  bgColor: string;
};

function ProductList({
  products,
  getImageUrl,
  title,
  Icon,
  iconColor,
  filterProducts,
  linkTo,
  bgColor,
}: ProductListProps) {
  const filteredProducts = filterProducts(products).splice(0, 4);

  return (
    <div
      className={`flex flex-grow flex-col rounded-lg ${bgColor} p-6 shadow-md`}
    >
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
        <Icon className={`mr-2 inline ${iconColor}`} /> {title}
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group rounded-lg border bg-white p-6 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={getImageUrl(product.category)}
              alt={product.title}
              className="mb-4 h-40 w-full rounded-lg object-contain transition-transform duration-200 group-hover:scale-110"
            />
            <h3 className="mb-2 text-nowrap text-xl font-bold text-gray-800">
              {product.title}
            </h3>
            <div className="mb-3 flex justify-between text-lg">
              <span className="flex items-center text-yellow-500">
                <FaStar className="mr-1 h-4 w-4" /> {product.rating}/5
              </span>
              <span className="flex items-center text-red-500">
                <FaTag className="mr-1 h-4 w-4" /> {product.discountPercentage}%
              </span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      <Link
        to={linkTo}
        className="mt-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 px-6 py-3 text-center text-xl font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-yellow-500 hover:shadow-xl hover:ring-2 hover:ring-yellow-500 hover:ring-offset-2"
      >
        Check All
      </Link>
    </div>
  );
}

export default ProductList;
