import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-dark-background">
      <Header />
      <main className="flex-1 p-8 md:p-12 bg-background dark:bg-dark-background text-text dark:text-dark-text">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
