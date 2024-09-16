import { useQuery } from '@tanstack/react-query';
import { fetchProducts, type Product } from '../services/apiProducts';
import Loader from '../ui/Loader';
import ErrorMessage from '../ui/ErrorMessage';

function Homepage() {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  const getImageUrl = (category: string) => {
    switch (category) {
      case 'beauty':
        return 'https://via.placeholder.com/300?text=Perfume';
      case 'furniture':
        return 'https://via.placeholder.com/300?text=Couch';
      default:
        return 'https://via.placeholder.com/300?text=Product';
    }
  };

  // Filtering products based on the 3 features
  const productsUnder20 = products?.filter((product) => product.price < 20);
  const productsWithDiscount = products?.filter(
    (product) => product.discountPercentage > 5,
  );
  const productsWithRating = products?.filter(
    (product) => product.rating > 3.5,
  );

  return (
    <div className="container mx-auto bg-background p-4 text-text dark:bg-dark-background dark:text-dark-text">
      {/* Hero Section */}
      <section className="hero-section mb-12 rounded-lg bg-primary p-8 text-white shadow-lg dark:bg-dark-primary">
        <h1 className="mb-4 text-5xl font-bold">Welcome to Schnell Korb</h1>
        <p className="text-lg">
          Discover the best deals on high-quality products. Shop now and enjoy
          fast delivery and excellent customer service!
        </p>
        <button className="mt-4 rounded-lg bg-secondary px-6 py-3 text-white">
          Shop Now
        </button>
      </section>

      {/* Grid Section */}
      <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Products under $20 */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Items under $20</h2>
          {productsUnder20?.map((product) => (
            <div key={product.id} className="mb-4 rounded-lg border p-4 shadow">
              <img
                src={getImageUrl(product.category)}
                alt={product.title}
                className="mb-2 h-40 w-full object-cover"
              />
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-gray-700">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Discounts over 5% */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Discounts over 5%</h2>
          {productsWithDiscount?.map((product) => (
            <div key={product.id} className="mb-4 rounded-lg border p-4 shadow">
              <img
                src={getImageUrl(product.category)}
                alt={product.title}
                className="mb-2 h-40 w-full object-cover"
              />
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-gray-700">
                Discount: {product.discountPercentage}%
              </p>
              <p className="text-gray-700">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Rating above 3.5 */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Rating above 3.5</h2>
          {productsWithRating?.map((product) => (
            <div key={product.id} className="mb-4 rounded-lg border p-4 shadow">
              <img
                src={getImageUrl(product.category)}
                alt={product.title}
                className="mb-2 h-40 w-full object-cover"
              />
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-gray-700">Rating: {product.rating}/5</p>
              <p className="text-gray-700">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Design Section */}
      <section className="custom-design rounded-lg bg-secondary p-8 text-white shadow-lg dark:bg-dark-secondary">
        <h2 className="mb-4 text-3xl font-bold">Exclusive Offers</h2>
        <p className="mb-4">
          Check out our exclusive offers for this season! You won't find these
          deals anywhere else.
        </p>
        <div className="flex justify-around">
          <div className="rounded-lg bg-white p-4 text-dark-background shadow-md dark:bg-dark-background dark:text-dark-text">
            <h3 className="text-xl font-semibold">Free Shipping</h3>
            <p>On orders over $50</p>
          </div>
          <div className="rounded-lg bg-white p-4 text-dark-background shadow-md dark:bg-dark-background dark:text-dark-text">
            <h3 className="text-xl font-semibold">Special Discounts</h3>
            <p>For our loyal customers</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
