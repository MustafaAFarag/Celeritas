import { Product } from '../../services/apiProducts';

interface ProductsUnderProps {
  products: Product[];
  getImageUrl: (category: string) => string;
}

function ProductsUnder({ products, getImageUrl }: ProductsUnderProps) {
  const filteredProducts = products
    .filter((product) => product.price < 20)
    .splice(0, 4);

  return (
    <div className="bg-red-300">
      <h2 className="mb-4 text-center text-2xl font-semibold">
        Items under $20
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border p-4 shadow-lg transition-shadow duration-200 hover:shadow-xl"
          >
            <div className="mb-2 flex justify-center">
              <img
                src={getImageUrl(product.category)}
                alt={product.title}
                className="mb-2 h-40 w-full rounded-lg object-contain"
              />
            </div>
            <h3 className="text-lg font-bold">{product.title}</h3>
            <p className="text-text">Discount: {product.discountPercentage}%</p>
            <p className="text-text">Rating: {product.rating}/5</p>
            <p className="text-text">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsUnder;
