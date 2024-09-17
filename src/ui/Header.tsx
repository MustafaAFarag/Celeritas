// components/Header.tsx
import { useState, useEffect } from 'react';
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

  return (
    <>
      <nav className="flex items-center justify-between bg-header-background p-4 px-16 shadow-lg">
        <div className="container mx-auto flex max-w-[120rem] items-center justify-between">
          <Logo />
          <NavBar />
          <div className="flex items-center space-x-3">
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <CartIcon />
            <UserIconComponent />
          </div>
        </div>
      </nav>
      <SearchBar />
    </>
  );
}

export default Header;
