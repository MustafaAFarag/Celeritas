import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/apiProducts';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl?: string; // Optional, since we'll use placeholders
}

function Homepage() {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products: {error.message}</div>;

  // Function to determine the image URL based on the category
  const getImageUrl = (category: string) => {
    switch (category) {
      case 'beauty':
        return 'https://via.placeholder.com/300?text=Perfume'; // Placeholder for beauty category
      case 'furniture':
        return 'https://via.placeholder.com/300?text=Couch'; // Placeholder for furniture category
      default:
        return 'https://via.placeholder.com/300?text=Product'; // Default placeholder for other categories
    }
  };

  return (
    <div className="container mx-auto bg-background p-4 text-text dark:bg-dark-background dark:text-dark-text">
      <h2 className="mb-4 text-3xl font-bold text-primary dark:text-dark-primary">
        Welcome to Schnell Korb
      </h2>
      <p className="mb-4 text-lg text-text dark:text-dark-text">
        Discover the best products available online. Browse through our
        categories and find the perfect items for you.
      </p>
      <ul>
        {products?.map((product) => (
          <li key={product.id} className="mb-4 rounded border p-4 shadow">
            <img
              src={getImageUrl(product.category)}
              alt={product.name}
              className="mb-2 h-48 w-full object-cover"
            />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{product.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Homepage;
