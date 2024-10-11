import { useState, useRef, FormEvent, MouseEvent } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, type Product } from '../../services/apiProducts';
import { useNavigate } from 'react-router-dom';
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const navigate = useNavigate();
  const autoCompleteRef = useRef<AutoComplete | null>(null);

  const { data: products } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const handleInputChange = (e: AutoCompleteCompleteEvent) => {
    const query = e.query; // Use e.query instead of e.value
    setSearchTerm(query);

    if (query.length >= 3) {
      const filteredSuggestions = products?.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()),
      );
      setSuggestions(filteredSuggestions?.slice(0, 5) || []); // Change slice to 5
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: Product) => {
    setSearchTerm(suggestion.title);
    setSuggestions([]);
    navigate(`product-detail?productId=${suggestion.id}`);
  };

  const handleSearch = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLDivElement>,
  ) => {
    // Prevent default only if it's a FormEvent
    if ((e as FormEvent<HTMLFormElement>).currentTarget) {
      e.preventDefault();
    }

    if (searchTerm.trim()) {
      navigate(`/products?query=${searchTerm}`);
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  const itemTemplate = (item: Product) => {
    return (
      <div className="flex items-center space-x-4 p-4 transition-colors duration-200 hover:bg-sellers-background">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-24 w-24 rounded-lg object-cover"
        />
        <h4 className="text-lg font-semibold text-text">{item.title}</h4>
      </div>
    );
  };

  return (
    <div className="bg-header-background p-4">
      <div className="container mx-auto max-w-[100rem]">
        <div className="relative">
          <form onSubmit={handleSearch}>
            <AutoComplete
              ref={autoCompleteRef}
              value={searchTerm}
              suggestions={suggestions}
              completeMethod={handleInputChange}
              field="title"
              onChange={(e: { value: string }) => setSearchTerm(e.value)}
              onSelect={(e: { value: Product }) =>
                handleSuggestionClick(e.value)
              }
              placeholder="Search for products, categories, brands..."
              className="w-full"
              itemTemplate={itemTemplate}
              inputClassName="w-full rounded-lg border border-gray-300 bg-background p-3 pl-5 pr-16 text-lg text-text transition-colors duration-300 hover:outline-none hover:ring-2 hover:ring-primary"
            />
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-lg bg-primary p-2"
              onClick={handleSearch}
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-white hover:cursor-pointer" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
