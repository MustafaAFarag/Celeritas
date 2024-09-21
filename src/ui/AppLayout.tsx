import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 bg-background p-8 text-text md:p-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
