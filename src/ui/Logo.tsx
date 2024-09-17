// components/HeaderLogo.tsx
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <h1 className="text-2xl font-extrabold tracking-tight">
      <Link to="/" className="text-primary">
        Schnell Korb
      </Link>
    </h1>
  );
}

export default Logo;
