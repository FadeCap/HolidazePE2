import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex justify-center items-center m-3 p-3">
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for venues..."
          className="p-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
}
