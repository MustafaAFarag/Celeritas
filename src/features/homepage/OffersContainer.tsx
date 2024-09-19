import { Link } from 'react-router-dom';
import { type Product } from '../../services/apiProducts';
import { IconType } from 'react-icons';
import { FaStar, FaTag } from 'react-icons/fa';

type ProductListProps = {
  products: Product[];
  title: string;
  Icon: IconType;
  iconColor: string;
  filterProducts: (products: Product[]) => Product[];
  linkTo: string;
  bgColor: string;
};

function OffersContainer({
  products,
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
        {filteredProducts.map((product) => {
          const originalPrice =
            product.price / (1 - product.discountPercentage / 100);

          return (
            <div
              key={product.id}
              className="group rounded-lg border bg-white p-6 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={product.thumbnail}
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
      <Link
        to={linkTo}
        className="mt-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 px-6 py-3 text-center text-xl font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-yellow-500 hover:shadow-xl hover:ring-2 hover:ring-yellow-500 hover:ring-offset-2"
      >
        Check All
      </Link>
    </div>
  );
}

export default OffersContainer;
