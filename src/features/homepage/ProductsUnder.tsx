import { FaDollarSign } from 'react-icons/fa';
import ProductList from './ProductList';
import { Product } from '../../services/apiProducts';

type ProductsUnderProps = {
  products: Product[];
  getImageUrl: (category: string) => string;
};

function ProductsUnder({ products, getImageUrl }: ProductsUnderProps) {
  return (
    <ProductList
      products={products}
      getImageUrl={getImageUrl}
      title="Items Under $20"
      Icon={FaDollarSign}
      iconColor="text-green-500"
      filterProducts={(products) =>
        products.filter((product) => product.price < 50 && product.price > 15)
      }
      linkTo="/signup"
      bgColor="bg-green-200"
    />
  );
}

export default ProductsUnder;
