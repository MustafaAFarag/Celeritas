import { FaTag } from 'react-icons/fa';
import ProductList from './ProductList';
import { Product } from '../../services/apiProducts';

type DiscountProductsProps = {
  products: Product[];
  getImageUrl: (category: string) => string;
};

function DiscountProducts({ products, getImageUrl }: DiscountProductsProps) {
  return (
    <ProductList
      products={products}
      getImageUrl={getImageUrl}
      title="Discounts Over 15%"
      Icon={FaTag}
      iconColor="text-red-600"
      filterProducts={(products) =>
        products.filter((product) => product.discountPercentage > 18)
      }
      linkTo="/signup"
      bgColor="bg-red-200"
    />
  );
}

export default DiscountProducts;
