import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartBanner from './CartBanner';
import SearchBar from '../features/header/SearchBar';
import { motion } from 'framer-motion';

function AppLayout() {
  const searchBarVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50">
        <Header />
      </header>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={searchBarVariants}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <SearchBar />
      </motion.div>
      <main className="flex-1 bg-background p-8 text-text md:p-12">
        <div className="z-10">
          <Outlet />
        </div>
      </main>
      <CartBanner />
      <Footer />
    </div>
  );
}

export default AppLayout;
