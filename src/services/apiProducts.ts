import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await axios.get('https://dummyjson.com/products?limit=500');
  return response.data.products;
}
