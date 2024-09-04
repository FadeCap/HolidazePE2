function Header() {
  return (
    <header className=" w-full bg-gray-500 flex justify-center items-center">
      <nav className="w-full max-w-screen-xl mx-auto p-4 md:flex md:items-center md:justify-between">
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="/" className="hover:underline me-4 md:me-6">
              Home
            </a>
          </li>

          <li>
            <a href="/about" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>

          <li>
            <a href="/services" className="hover:underline me-4 md:me-6">
              Services
            </a>
          </li>

          <li>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

