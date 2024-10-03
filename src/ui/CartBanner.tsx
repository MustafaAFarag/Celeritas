import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartBanner() {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between bg-blue-500 p-4 text-white">
      <div>
        <span className="font-bold">{totalItems}</span> item(s) in cart
      </div>
      <div>
        Total: <span className="font-bold">${totalPrice.toFixed(2)}</span>
      </div>
      <Link
        to="/cart"
        className="rounded-full bg-white px-4 py-2 font-bold text-blue-500 transition-colors hover:bg-blue-100"
      >
        View Cart
      </Link>
    </div>
  );
}

export default CartBanner;
