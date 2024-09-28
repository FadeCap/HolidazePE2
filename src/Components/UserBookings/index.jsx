import React, { useEffect, useState } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

const UserBookings = ({ username }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("You need to log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://v2.api.noroff.dev/holidaze/profiles/${username}/bookings?_venue=true`, // Include ?_venue=true
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "X-Noroff-API-Key": apiKey,
            },
          }
        );

        setBookings(response.data.data || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [username]);

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 m-4 width-1/2">
      <h2 className="text-xl font-bold mb-2">My Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="border-b py-4 flex items-center">
              {/* Venue Image */}
              {booking.venue?.media[0]?.url && (
                <img
                  src={booking.venue.media[0].url}
                  alt={booking.venue.media[0].alt || "Venue Image"}
                  className="w-24 h-24 object-cover rounded mr-4"
                />
              )}

              {/* Booking Details */}
              <div>
                <p className="font-bold">
                  {" "}
                  {booking.venue?.name || "Unknown Venue"}
                </p>
                <p className="mt-2">
                  Your stay is booked from{" "}
                  <span className="underline">
                    {new Date(booking.dateFrom).toLocaleDateString()}
                  </span>{" "}
                  to{" "}
                  <span className="underline">
                    {new Date(booking.dateTo).toLocaleDateString()}
                  </span>
                  .
                </p>
                <p className="mt-2">Guests: {booking.guests}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default UserBookings;
