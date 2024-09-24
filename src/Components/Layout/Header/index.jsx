import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          Holidaze
        </Link>

        {/* Hamburger Icon Mobile */}
        <button
          className="text-white block lg:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Menu Links Desktop */}
        <div className="hidden lg:flex space-x-4">
          <Link to="/contact" className="text-white hover:text-gray-200">
            Contact
          </Link>
          <Link to="/profile" className="text-white hover:text-gray-200">
            Profile
          </Link>
          <Link to="/auth" className="text-white hover:text-gray-200">
            Log in
          </Link>
        </div>
      </div>

      {/* Mobile Menu (visible when hamburger is clicked) */}
      {isOpen && (
        <div className="lg:hidden flex flex-col space-y-2 p-4 items-end">
          <Link
            to="/contact"
            className="text-white hover:text-gray-200"
            onClick={toggleMenu}
          >
            Contact
          </Link>
          <Link
            to="/profile"
            className="text-white hover:text-gray-200"
            onClick={toggleMenu}
          >
            Profile
          </Link>
          <Link
            to="/auth"
            className="text-white hover:text-gray-200"
            onClick={toggleMenu}
          >
            Log in
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Header;
