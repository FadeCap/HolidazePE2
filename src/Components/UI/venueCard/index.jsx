const VenueCard = ({ venues }) => {
  if (!venues || venues.length === 0) {
    return <div>No venues found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {venues.map((venue) => (
        <div 
          key={venue.id} 
          className="border rounded-lg shadow-lg overflow-hidden"
        >
          <img 
            src={venue.media?.[0]?.url || 'default-image-url.jpg'} 
            alt={venue.name} 
            className="w-full h-48 object-cover" 
          />
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">{venue.name}</h3>
            <p className="text-sm text-gray-700 mb-2">{venue.description}</p>
            <p className="text-sm font-medium">Price: ${venue.price}</p>
            <p className="text-sm font-medium">Rating: {venue.rating}</p>
            <p className="text-sm text-gray-600">
              Location: {venue.location.city}, {venue.location.country}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VenueCard;
