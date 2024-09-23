import { Link } from "react-router-dom";

const placeholderImage =
  "https://via.placeholder.com/400x300?text=No+Image+Available";

function VenueCard({ venue }) {
  const handleImageError = (e) => {
    e.target.src = placeholderImage;
  };

  return (
    <div className="border rounded-lg p-4 shadow-lg flex flex-col">
      {/* Venue Image */}
      {venue.media && venue.media[0] ? (
        <img
          src={venue.media[0].url}
          alt={venue.media[0].alt || "Venue image"}
          onError={handleImageError} // Fallback to placeholder if image fails to load
          className="w-full h-48 object-cover rounded-lg"
        />
      ) : (
        <img
          src={placeholderImage}
          alt="Placeholder image"
          className="w-full h-48 object-cover rounded-lg"
        />
      )}

      {/* Venue Name */}
      <h2 className="text-2xl font-bold mt-4">{venue.name}</h2>

      {/* Venue Location */}
      <p className="text-gray-600">
        {venue.location.city}, {venue.location.country}
      </p>

      {/* Venue Description */}
      <p className="mt-2 text-gray-700">{venue.description}</p>

      {/* Price and Max Guests */}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-lg font-semibold">${venue.price} / night</p>
        <p className="text-gray-500">Max Guests: {venue.maxGuests}</p>
      </div>

      {/* Rating */}
      <p className="text-yellow-500 mt-2">Rating: {venue.rating} / 5</p>

      {/* Amenities */}
      <div className="mt-4">
        <p className="font-medium">Amenities:</p>
        <ul className="list-disc list-inside">
          <li>Wifi: {venue.meta.wifi ? "Yes" : "No"}</li>
          <li>Parking: {venue.meta.parking ? "Yes" : "No"}</li>
          <li>Pets Allowed: {venue.meta.pets ? "Yes" : "No"}</li>
          <li>Breakfast: {venue.meta.breakfast ? "Yes" : "No"}</li>
        </ul>
      </div>

      {/* View Details Link at the bottom */}
      <Link
        to={`/venue/${venue.id}`}
        className="text-blue-500 hover:underline mt-auto text-center"
      >
        View Details
      </Link>
    </div>
  );
}

export default VenueCard;
