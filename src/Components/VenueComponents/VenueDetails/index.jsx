import StarRating from '../StarRating';

function VenueDetails({ venue }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <p className="text-2xl font-semibold mb-2">${venue.price} / night</p>
        <p className="text-gray-500">Max Guests: {venue.maxGuests}</p>

        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Rating:</span>
          <StarRating maxRating={5} rating={venue.rating} />
        </div>

        <p className="text-gray-500">Bookings: {venue._count.bookings}</p>
      </div>

      {/* Booking Button */}
      <div className="mt-8">
        <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
          Book Now
        </button>
      </div>
    </div>
  );
}

export default VenueDetails;
