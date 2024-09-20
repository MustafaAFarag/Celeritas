// components/Header.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion
import Logo from './Logo';
import NavBar from '../features/header/Navbar';
import ThemeToggle from '../features/header/ThemeToggle';
import CartIcon from '../features/header/CartIcon';
import UserIconComponent from '../features/header/UserIconComponent';
import SearchBar from '../features/header/SearchBar';

function Header() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const searchBarVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        transition={{ duration: 0.5 }} // Customize the duration as needed
        className="sticky top-0 z-50 flex items-center justify-between bg-header-background p-4 px-16 shadow-lg"
      >
        <div className="container mx-auto flex max-w-[120rem] items-center justify-between">
          <Logo />
          <NavBar />
          <div className="flex items-center space-x-3">
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <CartIcon />
            <UserIconComponent />
          </div>
        </div>
      </motion.nav>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={searchBarVariants}
        transition={{ duration: 0.5 }} // Customize the duration as needed
      >
        <SearchBar />
      </motion.div>
    </>
  );
}

export default Header;
