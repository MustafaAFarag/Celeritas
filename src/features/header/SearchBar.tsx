import { useState, ChangeEvent, FormEvent } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, type Product } from '../../services/apiProducts';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const navigate = useNavigate();

  const { data: products } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length >= 3) {
      const filteredSuggestions = products?.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()),
      );

      setSuggestions(filteredSuggestions?.slice(0, 6) || []);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: Product) => {
    setSearchTerm(suggestion.title); // Update this line to set only the title
    setSuggestions([]);
    navigate(`product-detail?productId=${suggestion.id}`);
  };

  function handleSearch(e: FormEvent) {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/products?query=${searchTerm}`);
      setSearchTerm('');
      setSuggestions([]);
    }
  }

  return (
    <div className="bg-header-background p-4">
      <div className="container mx-auto max-w-[100rem]">
        <div className="relative">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search for products, categories, brands..."
              className="w-full rounded-lg border border-gray-300 bg-background p-3 pl-5 pr-16 text-lg text-text transition-colors duration-300 hover:outline-none hover:ring-2 hover:ring-primary"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-lg bg-primary p-2">
              <MagnifyingGlassIcon className="h-5 w-5 text-white hover:cursor-pointer" />
            </div>

            {suggestions.length > 0 && (
              <ul className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-background shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-4 p-4 transition-colors duration-200 hover:bg-sellers-background"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <img
                      src={suggestion.thumbnail}
                      alt={suggestion.title}
                      className="h-16 w-16 rounded-lg object-cover"
                    />

                    <h4 className="text-md font-semibold text-text">
                      {suggestion.title}
                    </h4>
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
