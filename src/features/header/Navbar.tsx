import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <ul className="flex translate-x-28 space-x-10 text-xl">
      <li>
        <Link
          to="/products"
          className="text-text transition-colors duration-300 hover:text-primary"
        >
          All
        </Link>
      </li>
      <li>
        <Link
          to="/products?category=beauty"
          className="text-text transition-colors duration-300 hover:text-primary"
        >
          Beauty
        </Link>
      </li>
      <li>
        <Link
          to="/products?category=furniture"
          className="text-text transition-colors duration-300 hover:text-primary"
        >
          House-Appliances
        </Link>
      </li>
      <li>
        <Link
          to="/products?category=laptops"
          className="text-text transition-colors duration-300 hover:text-primary"
        >
          Electronics
        </Link>
      </li>
      <li>
        <Link
          to="/products?category=clothes"
          className="text-text transition-colors duration-300 hover:text-primary"
        >
          Clothes
        </Link>
      </li>
      <li>
        <Link
          to="/products?category=vehicle"
          className="text-text transition-colors duration-300 hover:text-primary"
        >
          Vechicles
        </Link>
      </li>
    </ul>
  );
}

export default NavBar;
