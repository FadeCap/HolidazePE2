import { Link } from "react-router-dom";
import StarRating from "../StarRating";
import AmenityIcon from "../AmenityIcon";

const placeholderImage =
  "https://via.placeholder.com/400x300?text=No+Image+Available";

function VenueCard({ venue }) {
  const handleImageError = (e) => {
    e.target.src = placeholderImage;
  };

  return (
    <div className="border rounded-lg p-0 shadow-lg flex flex-col">
      {/* Venue Image */}
      {venue.media && venue.media[0] ? (
        <img
          src={venue.media[0].url}
          alt={venue.media[0].alt || "Venue image"}
          onError={handleImageError}
          className="w-full h-64 object-cover rounded-t-lg"
        />
      ) : (
        <img
          src={placeholderImage}
          alt="Placeholder image"
          className="w-full h-64 object-cover rounded-t-lg p-0 m-0"
        />
      )}

      {/* Venue Name */}
      <h2 className="text-2xl font-bold mt-4 p-4">{venue.name}</h2>

      {/* Venue Location */}
      <p className="text-gray-600 pl-4">
        {venue.location.city} {venue.location.country}
      </p>

      {/* Amenities */}
      <div className="p-4">
        <ul className="flex flex-wrap space-x-1 list-none justify-center">
          <li>
            <AmenityIcon available={venue.meta.wifi} name="WiFi" />
          </li>
          <li>
            <AmenityIcon available={venue.meta.parking} name="Parking" />
          </li>
          <li>
            <AmenityIcon available={venue.meta.pets} name="Pets Allowed" />
          </li>
          <li>
            <AmenityIcon available={venue.meta.breakfast} name="Breakfast" />
          </li>
        </ul>
      </div>

      {/* Rating */}
      <div className="pl-4">
        <StarRating maxRating={5} rating={venue.rating} />{" "}
      </div>

      

      {/* Price and Max Guests */}
      <div className="mt-4 flex justify-between items-center m-4">
        <p className="text-lg font-semibold">${venue.price} / night</p>
        <p className="text-gray-500">Max Guests: {venue.maxGuests}</p>
      </div>

      {/* Venue Description */}
      <p className="mt-2 text-gray-700 p-4">{venue.description}</p>

      <div className="flex justify-center pt-4 pb-4 m-4">
        <Link
          to={`/venue/${venue.id}`}
          className="text-blue-500 hover:underline mt-auto text-center"
        >
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            View Details
          </button>
        </Link>
      </div>
      {/* View Details Button */}
    </div>
  );
}

export default VenueCard;
