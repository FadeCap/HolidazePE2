import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRating from '../../Components/StarRating';
import AmenitiesList from '../../Components/Amenities/AmenityList';
import Carousel from '../../Components/Carousel';

function SpecificVenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Venue not found');
        }
        return response.json();
      })
      .then((data) => {
        setVenue(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching venue:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!venue) {
    return <div className="text-center mt-10">Venue not found.</div>;
  }

  // Prepare the amenities array after the venue has been fetched
  const venueAmenities = [
    { name: 'WiFi', available: venue.meta.wifi },
    { name: 'Parking', available: venue.meta.parking },
    { name: 'Pets Allowed', available: venue.meta.pets },
    { name: 'Breakfast', available: venue.meta.breakfast },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Image Carousel */}
      <Carousel images={venue.media} /> {/* Use the Carousel component */}

      {/* Venue Name */}
      <h1 className="text-4xl font-bold mb-4">{venue.name}</h1>

      {/* Venue Location */}
      <p className="text-xl text-gray-600 mb-4">
        {venue.location.address ? `${venue.location.address}, ` : ''}
        {venue.location.city} {venue.location.country}
      </p>

       {/* Amenities */}
    <div className="mt-4">
      <div className="flex flex-wrap">
        <AmenitiesList amenities={venueAmenities} />
      </div>
    </div>

      {/* Venue Description */}
      <p className="mb-6 text-lg">{venue.description}</p>

      {/* Venue Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Price, Max Guests, Rating, and Booking Count */}
        <div>
          <p className="text-2xl font-semibold mb-2">${venue.price} / night</p>
          <p className="text-gray-500">Max Guests: {venue.maxGuests}</p>

          {/* Rating */}
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">Rating:</span>
            <StarRating maxRating={5} rating={venue.rating} />
          </div>

          <p className="text-gray-500">Bookings: {venue._count.bookings}</p>
        </div>
      </div>

      {/* Booking Button */}
      <div className="mt-8">
        <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
          Book Now
        </button>
      </div>

      {/* Created & Updated Dates */}
      <div className="mt-4 text-gray-400">
        <p>Created on: {new Date(venue.created).toLocaleDateString()}</p>
        <p>Last updated: {new Date(venue.updated).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default SpecificVenuePage;
