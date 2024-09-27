import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VenueCarousel from "../../Components/VenueComponents/VenueCarousel";
import VenueDetails from "../../Components/VenueComponents/VenueDetails";
import VenueLocation from "../../Components/VenueComponents/VenueLocation";
import VenueDates from "../../Components/VenueComponents/VenueDates";
import AmenitiesList from "../../Components/VenueComponents/Amenities/AmenityList";
import BookingForm from "../../Components/VenueComponents/BookingForm";
import "react-calendar/dist/Calendar.css";

function SpecificVenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Venue not found");
        }
        return response.json();
      })
      .then((data) => {
        setVenue(data.data);
        setLoading(false);
        const dates = data.data.bookings.map((booking) => ({
          start: new Date(booking.dateFrom),
          end: new Date(booking.dateTo),
        }));
        setBookedDates(dates);
      })
      .catch((error) => {
        console.error("Error fetching venue:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!venue) {
    return <div className="text-center mt-10">Venue not found.</div>;
  }

  // Transform meta object into an array for AmenitiesList
  const amenities = Object.keys(venue.meta).map((key) => ({
    name: key,
    available: venue.meta[key],
  }));

  return (
    <div className="container mx-auto p-4">
      {/* Image Carousel */}
      <VenueCarousel images={venue.media} />

      <div className="flex flex-col md:flex-row">
        <div className="flex-1 md:mr-4">
          {/* Venue Name */}
          <h1 className="text-4xl font-bold mb-4">{venue.name}</h1>

          {/* Venue Location */}
          <VenueLocation location={venue.location} />

          {/* Venue Amenities */}
          <AmenitiesList amenities={amenities} />

          {/* Venue Description */}
          <p className="mb-6 text-lg">{venue.description}</p>

          {/* Venue Details */}
          <VenueDetails venue={venue} />

          {/* Created & Updated Dates */}
          <VenueDates created={venue.created} updated={venue.updated} />
        </div>

        <div className="w-full md:w-1/3 mb-4 border-lg p-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Book Now</h2>
            <BookingForm
              venueId={venue.id}
              maxGuests={venue.maxGuests}
              bookedDates={bookedDates}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecificVenuePage;
