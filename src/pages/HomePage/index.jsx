import React, { useState } from "react";
import VenueCard from "../../Components/VenueComponents/VenueCard";
import useFetchVenues from "../../hooks/useFetchVenues";
import SearchBar from "../../Components/SearchBar";

function HomePage() {
  const { venues, loading, error } = useFetchVenues();
  const [searchQuery, setSearchQuery] = useState("");

  // Remove duplicate venues using a Map for efficiency
  const uniqueVenues = Array.from(
    new Map(venues.map((venue) => [venue.id, venue])).values()
  );

  // Filter venues by the search query (name, description, or location)
  const filteredVenues = uniqueVenues.filter((venue) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = venue.name.toLowerCase().includes(query);
    const descriptionMatch = venue.description.toLowerCase().includes(query);
    const locationMatch =
      venue.location.city?.toLowerCase().includes(query) ||
      venue.location.country?.toLowerCase().includes(query);

    return nameMatch || descriptionMatch || locationMatch;
  });

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
