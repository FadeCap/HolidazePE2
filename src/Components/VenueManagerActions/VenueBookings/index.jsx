import { useEffect, useState } from "react";
import axios from "axios";

const VenueBookings = ({ venueId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchBookings = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(
          `https://v2.api.noroff.dev/holidaze/venues/${venueId}?_bookings=true`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "X-Noroff-API-Key": apiKey,
            },
          }
        );
        setBookings(response.data.data.bookings);
        console.log(response.data.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Error fetching bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [venueId]);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h4>Bookings for this Venue</h4>
      {bookings.length === 0 ? (
        <p>No bookings for this venue.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <p>Booking ID: {booking.id}</p>
            <p>Guests: {booking.guests}</p>
            <p>Start Date: {new Date(booking.dateFrom).toLocaleDateString()}</p>
            <p>End Date: {new Date(booking.dateTo).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default VenueBookings;
