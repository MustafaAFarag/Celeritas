// components/HeaderSearchBar.tsx
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

function SearchBar() {
  return (
    <div className="bg-header-background p-4">
      <div className="container mx-auto max-w-[100rem]">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for products, categories, brands..."
            className="w-full rounded-lg border border-gray-300 bg-background p-3 pl-5 pr-16 text-lg text-text transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-lg bg-primary p-2">
            <MagnifyingGlassIcon className="h-5 w-5 text-white hover:cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
