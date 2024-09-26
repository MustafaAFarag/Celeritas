// components/HeaderUserIcon.tsx
import { UserIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

function UserIconComponent() {
  return (
    <Link
      to="/account-settings"
      className="flex transform items-center rounded-lg bg-primary p-2 text-white shadow-md transition-transform duration-200 hover:scale-110 hover:bg-opacity-90"
      aria-label="Login/Signup"
    >
      <UserIcon className="h-5 w-5 text-white" />
    </Link>
  );
}

export default UserIconComponent;
