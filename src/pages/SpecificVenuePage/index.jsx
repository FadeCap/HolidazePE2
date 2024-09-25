import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VenueCarousel from '../../Components/VenueComponents/VenueCarousel';
import VenueDetails from '../../Components/VenueComponents/VenueDetails';
import VenueLocation from '../../Components/VenueComponents/VenueLocation';
import VenueCalendar from '../../Components/VenueComponents/VenueCalendar';
import VenueDates from '../../Components/VenueComponents/VenueDates';
import 'react-calendar/dist/Calendar.css';

function SpecificVenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Venue not found');
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

  return (
    <div className="container mx-auto p-4">
      {/* Image Carousel */}
      <VenueCarousel images={venue.media} />

      {/* Venue Name */}
      <h1 className="text-4xl font-bold mb-4">{venue.name}</h1>

      {/* Venue Location */}
      <VenueLocation location={venue.location} />

      {/* Calendar for available dates */}
      <VenueCalendar bookedDates={bookedDates} />

      {/* Venue Description */}
      <p className="mb-6 text-lg">{venue.description}</p>

      {/* Venue Details */}
      <VenueDetails venue={venue} />

      {/* Created & Updated Dates */}
      <VenueDates created={venue.created} updated={venue.updated} />
    </div>
  );
}

export default SpecificVenuePage;
