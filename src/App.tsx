import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import AppLayout from './ui/AppLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import ProductListing from './pages/ProductListing';
// import ProductDetails from './pages/ProductDetails';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import OrderConfirmation from './pages/OrderConfirmation';
// import OrderHistory from './pages/OrderHistory';
// import Feedback from './pages/Feedback';
// import Help from './pages/Help';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import ManageProducts from './pages/admin/ManageProducts';
// import ManageCoupons from './pages/admin/ManageCoupons';
// import ManageCategories from './pages/admin/ManageCategories';
// import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              // <ProtectedRoute>
              <AppLayout />
              // </ProtectedRoute>
            }
          >
            <Route path="/" element={<Homepage />} />
            {/* <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/help" element={<Help />} /> */}
            {/* <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/manage-products" element={<ManageProducts />} />
            <Route path="/admin/manage-coupons" element={<ManageCoupons />} />
            <Route
            path="/admin/manage-categories"
            element={<ManageCategories />}
            />
            </Route> */}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              backgroundColor: '#d4edda',
              color: '#155724',
              border: '1px solid #c3e6cb',
            },
          },
          error: {
            duration: 5000,
            style: {
              backgroundColor: '#f8d7da',
              color: '#721c24',
              border: '1px solid #f5c6cb',
            },
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
