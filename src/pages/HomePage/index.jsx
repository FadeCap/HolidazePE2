import React, { useState } from 'react';
import VenueCard from  '../../Components/UI/VenueCard';
import useFetchVenues from '../../hooks/useFetchVenues';
import SearchBar from '../../Components/SearchBar';

function HomePage() {
  const { venues, loading, error } = useFetchVenues();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter venues by the search query
  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Available Venues</h1>
      
      {/* SearchBar Component */}
      <SearchBar onSearch={handleSearch} />

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {filteredVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
