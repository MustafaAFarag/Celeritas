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
      title="Items Under $40"
      Icon={FaDollarSign}
      iconColor="text-green-500"
      filterProducts={(products) =>
        products.filter((product) => product.price < 40 && product.price > 15)
      }
      linkTo="/signup"
      bgColor="bg-product-background"
    />
  );
}

export default ProductsUnder;
