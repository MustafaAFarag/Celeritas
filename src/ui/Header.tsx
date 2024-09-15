import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  SunIcon,
  MoonIcon,
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';

function Header() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="p-4 px-16 shadow-lg bg-header-background dark:bg-dark-header-background flex items-center justify-between">
        <div className="container mx-auto max-w-[120rem] flex items-center justify-between">
          {/* Logo Section */}
          <h1 className="text-2xl font-extrabold tracking-tight">
            <Link to="/" className="text-primary dark:text-dark-primary">
              Schnell Korb
            </Link>
          </h1>

          {/* Navigation Links */}
          <ul className="flex space-x-10 text-xl">
            <li>
              <Link
                to="/"
                className="text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary transition-colors duration-300"
              >
                Electronics
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary transition-colors duration-300"
              >
                Appliances
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary transition-colors duration-300"
              >
                Packages
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary transition-colors duration-300"
              >
                Samsungs
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary transition-colors duration-300"
              >
                Iphones
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary transition-colors duration-300"
              >
                Macs
              </Link>
            </li>
          </ul>

          {/* Theme Toggle Button, Cart Icon, and Login/Signup Button */}
          <div className="flex space-x-3 items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-primary dark:bg-dark-primary hover:bg-opacity-90 text-white shadow-md flex items-center transition-transform transform hover:scale-110 duration-200"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5 text-white" />
              ) : (
                <MoonIcon className="h-5 w-5 text-white" />
              )}
            </button>
            <Link
              to="/cart"
              className="p-2 rounded-lg bg-primary dark:bg-dark-primary hover:bg-opacity-90 text-white shadow-md flex items-center transition-transform transform hover:scale-110 duration-200"
              aria-label="Cart"
            >
              <ShoppingCartIcon className="h-5 w-5 text-white" />
            </Link>
            <Link
              to="/login"
              className="p-2 rounded-lg bg-primary dark:bg-dark-primary hover:bg-opacity-90 text-white shadow-md flex items-center transition-transform transform hover:scale-110 duration-200"
              aria-label="Login/Signup"
            >
              <UserIcon className="h-5 w-5 text-white" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="bg-header-background dark:bg-dark-header-background p-4">
        <div className="container mx-auto max-w-[100rem]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, categories, brands..."
              className="w-full p-3 pl-5 pr-16 text-lg rounded-lg bg-light-background dark:bg-dark-background border border-gray-300 dark:border-gray-700 text-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary transition-colors duration-300"
            />

            {/* Search Icon with Background */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary dark:bg-dark-primary p-2 rounded-lg">
              <MagnifyingGlassIcon className="h-5 w-5 text-white hover:cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
