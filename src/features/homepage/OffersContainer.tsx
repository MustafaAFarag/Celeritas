import { Link } from 'react-router-dom';
import { type Product } from '../../services/apiProducts';
import { IconType } from 'react-icons';
import ProductCard from '../../ui/ProductCard';
import { motion } from 'framer-motion';

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1 }, // stagger effect
    }),
  };

  return (
    <motion.div
      className={`flex flex-grow flex-col rounded-lg ${bgColor} p-6 shadow-lg`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="mb-6 text-center text-3xl font-bold text-nochange-text">
        <Icon className={`mr-2 inline ${iconColor}`} /> {title}
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            variants={cardVariants}
            custom={index}
            initial="hidden"
            animate="visible"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
      <Link
        to={linkTo}
        className="mt-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 px-6 py-3 text-center text-xl font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-yellow-500 hover:shadow-xl hover:ring-2 hover:ring-yellow-500 hover:ring-offset-2"
      >
        Check All
      </Link>
    </motion.div>
  );
}

export default OffersContainer;
