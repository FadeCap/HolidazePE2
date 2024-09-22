import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          BookingSite
        </Link>
        <div className="space-x-4">
          <Link to="/contact" className="text-white hover:text-gray-200">
            Contact
          </Link>
          <Link to="/profile" className="text-white hover:text-gray-200">
            Profile
          </Link>
          <Link to="/auth" className="text-white hover:text-gray-200">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
