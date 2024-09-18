import { FaStar } from 'react-icons/fa';
import ProductList from './ProductList';
import { Product } from '../../services/apiProducts';

type RatedProductProps = {
  products: Product[];
  getImageUrl: (category: string) => string;
};

function RatedProduct({ products, getImageUrl }: RatedProductProps) {
  return (
    <ProductList
      products={products}
      getImageUrl={getImageUrl}
      title="Rating Above 3.5"
      Icon={FaStar}
      iconColor="text-yellow-500"
      filterProducts={(products) =>
        products.filter((product) => product.rating > 4)
      }
      linkTo="/signup"
      bgColor="bg-yellow-200"
    />
  );
}

export default RatedProduct;
