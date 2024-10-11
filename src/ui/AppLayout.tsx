import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartBanner from './CartBanner';

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
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
