import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer bg-white shadow dark:bg-gray-800 w-full">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <Link to="/" className="text-white font-bold text-xl">
          Holidaze
        </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
