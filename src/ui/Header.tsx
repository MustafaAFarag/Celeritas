import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import Logo from './Logo';
import NavBar from '../features/header/Navbar';
import ThemeToggle from '../features/header/ThemeToggle';
import CartIcon from '../features/header/CartIcon';
import UserIconComponent from '../features/header/UserIconComponent';
import SearchBar from '../features/header/SearchBar';
import { getCurrentUser, logout, type User } from '../services/apiAuth';
import { useQuery, useQueryClient } from '@tanstack/react-query';

function Header() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Detect user's system preference and set dark mode accordingly
  useEffect(() => {
    const userPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    setIsDarkMode(userPrefersDark);

    const handleColorSchemeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handleColorSchemeChange);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleColorSchemeChange);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark or light mode class to the body
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User | null>({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate('/');
    queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const searchBarVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) return <p>Loading....</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 flex items-center justify-between bg-header-background p-4 px-16 shadow-lg"
      >
        <div className="container mx-auto flex max-w-[120rem] items-center justify-between">
          <Logo />
          <NavBar />
          <div className="flex translate-x-28 items-center space-x-3">
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <CartIcon />
            {user ? (
              <div className="flex items-center space-x-4">
                <UserIconComponent />
                <button
                  onClick={handleLogout}
                  className="flex transform items-center rounded-lg bg-primary p-2 text-white shadow-md transition-transform duration-200 hover:scale-110 hover:bg-opacity-90"
                >
                  <FaSignOutAlt className="text-xl" />
                </button>
                <p>Welcome {user.full_name}</p>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="bg- rounded-lg bg-primary p-2 text-lg font-medium text-white hover:underline"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg- rounded-lg bg-primary p-2 text-lg font-medium text-white hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={searchBarVariants}
        transition={{ duration: 0.5 }}
      >
        <SearchBar />
      </motion.div>
    </>
  );
}

export default Header;
