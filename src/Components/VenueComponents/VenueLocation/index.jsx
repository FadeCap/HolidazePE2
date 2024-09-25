function VenueLocation({ location }) {
    return (
      <p className="text-xl text-gray-600 mb-4">
        {location.address ? `${location.address}, ` : ''}
        {location.city}, {location.country}
      </p>
    );
  }
  
  export default VenueLocation;
  