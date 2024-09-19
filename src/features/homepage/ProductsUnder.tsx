import { FaDollarSign } from 'react-icons/fa';
import { Product } from '../../services/apiProducts';
import OffersContainer from './OffersContainer';

type ProductsUnderProps = {
  products: Product[];
};

function ProductsUnder({ products }: ProductsUnderProps) {
  return (
    <OffersContainer
      products={products}
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
