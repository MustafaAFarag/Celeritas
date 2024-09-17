// components/HeaderNavBar.tsx
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <ul className="flex space-x-10 text-xl">
      <li>
        <Link
          to="/"
          className="text-text transition-colors duration-300 hover:text-primary"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className="text-text transition-colors duration-300 hover:text-primary"
        >
          Electronics
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className="text-text transition-colors duration-300 hover:text-primary"
        >
          Appliances
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className="text-text transition-colors duration-300 hover:text-primary"
        >
          Packages
        </Link>
      </li>
      <li>
        <Link
          to="/cart"
          className="text-text transition-colors duration-300 hover:text-primary"
        >
          Samsungs
        </Link>
      </li>
      <li>
        <Link
          to="/login"
          className="text-text transition-colors duration-300 hover:text-primary"
        >
          Iphones
        </Link>
      </li>
      <li>
        <Link
          to="/admin"
          className="text-text transition-colors duration-300 hover:text-primary"
        >
          Macs
        </Link>
      </li>
    </ul>
  );
}

export default NavBar;
