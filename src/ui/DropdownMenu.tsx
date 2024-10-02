import { Link } from 'react-router-dom';

type DropdownItem = {
  label: string;
  link: string;
};

type DropdownMenuProps = {
  title: string;
  link: string;
  items: DropdownItem[];
  visibleDropdown: string | null;
  handleMouseEnter: (dropdown: string) => void;
  handleMouseLeave: () => void;
  brandSectionIndex?: number;
};

function DropdownMenu({
  title,
  link,
  items,
  visibleDropdown,
  handleMouseEnter,
  handleMouseLeave,
  brandSectionIndex,
}: DropdownMenuProps) {
  return (
    <li
      className="relative"
      onMouseEnter={() => handleMouseEnter(title.toLowerCase())}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={link}
        className="text-text transition-colors duration-300 hover:text-primary"
      >
        {title}
      </Link>
      {visibleDropdown === title.toLowerCase() && (
        <ul className="absolute left-0 w-64 bg-background p-2 shadow-lg">
          {items.map((item, index) => (
            <>
              {brandSectionIndex !== undefined &&
                index === brandSectionIndex && (
                  <li className="border-t border-gray-200 px-2 py-2 font-bold text-gray-400">
                    Brands
                  </li>
                )}
              <li className="hover:bg-header-background">
                <Link to={item.link} className="block p-2">
                  {item.label}
                </Link>
              </li>
            </>
          ))}
        </ul>
      )}
    </li>
  );
}

export default DropdownMenu;
