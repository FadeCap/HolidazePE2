import { useState } from "react";
import bannerImage from "../../assets/homepage-banner.jpg";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div
      className="relative w-full h-64 bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="search-bar">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for venues..."
            className="p-2 w-80 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
