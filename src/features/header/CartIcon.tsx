import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

function CartIcon() {
  return (
    <Link
      to="/cart"
      className="flex transform items-center rounded-lg bg-primary p-2 text-white shadow-md transition-transform duration-200 hover:scale-110 hover:bg-opacity-90"
      aria-label="Cart"
    >
      <ShoppingCartIcon className="h-5 w-5 text-white" />
    </Link>
  );
}

export default CartIcon;
