import { Link } from 'react-router-dom';
import { useState } from 'react';
import DropdownMenu from '../../ui/DropdownMenu';

function NavBar() {
  const [visibleDropdown, setVisibleDropdown] = useState<string | null>(null);

  function handleMouseEnter(dropdown: string) {
    setVisibleDropdown(dropdown);
  }

  function handleMouseLeave() {
    setVisibleDropdown(null);
  }

  return (
    <ul className="flex translate-x-28 space-x-20 text-xl">
      <li>
        <Link
          to="/products"
          className="text-text transition-colors duration-300 hover:text-primary"
        >
          All
        </Link>
      </li>
      {/* BEAUTY SECTION */}
      <DropdownMenu
        title="Beauty"
        link="/products?category=beauty"
        visibleDropdown={visibleDropdown}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        brandSectionIndex={2} // Index where brands start
        items={[
          { label: 'Fragrances', link: '/products?category=fragrances' },
          { label: 'Skin Care', link: '/products?category=skin-care' },
          // Brand Section
          { label: 'Chanel', link: '/products?brand=Chanel' },
          { label: 'Essence', link: '/products?brand=Essence' },
          { label: 'Chic Cosmetics', link: '/products?brand=Chic Cosmetics' },
          { label: 'Dior', link: '/products?brand=Dior' },
          { label: 'Dolce & Gabbana', link: '/products?brand=Dolce & Gabbana' },
          {
            label: 'Gucci',
            link: '/products?brand=Gucci',
          },
        ]}
      />

      {/* HOUSE APPLIANCES SECTION */}
      <DropdownMenu
        title="Home & Kitchen"
        link="/products?category=furniture"
        visibleDropdown={visibleDropdown}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        brandSectionIndex={4} // Index where brands start
        items={[
          { label: 'Furniture', link: '/products?category=furniture' },
          {
            label: 'Home Decoration',
            link: '/products?category=home-decoration',
          },
          {
            label: 'Kitchen Accessories',
            link: '/products?category=kitchen-accessories',
          },
          { label: 'Groceries', link: '/products?category=groceries' },
          // Brand Section
          { label: 'Amazon', link: '/products?brand=Amazon' },
          { label: 'Attitude', link: '/products?brand=Attitude' },
          { label: 'Bath Trends', link: '/products?brand=Bath Trends' },
          {
            label: 'Annibale Colombo',
            link: '/products?brand=Annibale Colombo',
          },
        ]}
      />

      {/* ELECTRONICS SECTION */}

      <DropdownMenu
        title="Electronics"
        link="/products?category=laptops"
        visibleDropdown={visibleDropdown}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        brandSectionIndex={3}
        items={[
          { label: 'Laptops', link: '/products?category=laptops' },
          { label: 'Mobiles', link: '/products?category=smartphones' },
          {
            label: 'Mobiles Accessories',
            link: '/products?category=mobile-accessories',
          },
          // Brand Section

          { label: 'Amazon', link: '/products?brand=Amazon' },
          { label: 'Apple', link: '/products?brand=Apple' },
          { label: 'Samsung', link: '/products?brand=Samsung' },
          { label: 'Asus', link: '/products?brand=Asus' },
          { label: 'Dell', link: '/products?brand=Dell' },
          { label: 'Beats', link: '/products?brand=Beats' },
          { label: 'TechGear', link: '/products?brand=TechGear' },
        ]}
      />

      {/* Fashion & Accessories SECTION */}

      <DropdownMenu
        title="Fashion & Accessories"
        link="/products?category=mens-shirts"
        visibleDropdown={visibleDropdown}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        brandSectionIndex={9}
        items={[
          { label: 'Mens Shirts', link: '/products?category=mens-shirts' },
          { label: 'Mens Shoes', link: '/products?category=mens-shoes' },
          { label: 'Mens Watches', link: '/products?category=mens-watches' },
          { label: 'Womens Bags', link: '/products?category=womens-bags' },
          {
            label: 'Womens Dresses',
            link: '/products?category=womens-dresses',
          },
          {
            label: 'Womens Jewellery',
            link: '/products?category=womens-jewellery',
          },
          { label: 'Womens Shoes', link: '/products?category=womens-shoes' },
          {
            label: 'Womens Watches',
            link: '/products?category=womens-watches',
          },
          {
            label: 'Sports Accessories',
            link: '/products?category=sports-accessories',
          },
          // Brand Section

          {
            label: 'Calvin Klein',
            link: '/products?brand=Calvin Klein',
          },
          {
            label: 'Casual Comfort',
            link: '/products?brand=Casual',
          },
          {
            label: 'Classic Wear',
            link: '/products?brand=Classic Wear',
          },
          {
            label: 'Rolex',
            link: '/products?brand=Rolex',
          },
          {
            label: 'Nike',
            link: '/products?brand=Nike',
          },
          {
            label: 'Puma',
            link: '/products?brand=Puma',
          },
        ]}
      />

      {/* VEHICLES SECTION */}

      <DropdownMenu
        title="Vehicles"
        link="/products?category=vehicle"
        visibleDropdown={visibleDropdown}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        brandSectionIndex={2}
        items={[
          { label: 'Cars', link: '/products?category=vehicle' },
          { label: 'Motorcycles', link: '/products?category=motorcycle' },
          { label: 'Chrysler', link: '/products?brand=Chrysler' },
          { label: 'Dodge', link: '/products?brand=Dodge' },
          {
            label: 'Generic Motors',
            link: '/products?brand=Generic Motors',
          },
          { label: 'Kawasaki', link: '/products?brand=Kawasaki' },
          { label: 'SpeedMaster', link: '/products?brand=SpeedMaster' },
          { label: 'MotoGP', link: '/products?brand=MotoGP' },
        ]}
      />
    </ul>
  );
}

export default NavBar;
