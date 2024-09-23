
import VenueCard from '../../Components/UI/VenueCard';
import useFetchVenues from '../../hooks/useFetchVenues.jsx';

function HomePage() {
  const { venues, loading, error } = useFetchVenues();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Your SearchBar content goes here */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
