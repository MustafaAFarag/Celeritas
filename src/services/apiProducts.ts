import axios from 'axios';

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  imageUrl?: string;
};

export async function fetchProducts(): Promise<Product[]> {
  const response = await axios.get('https://dummyjson.com/products?limit=500');
  return response.data.products;
}
