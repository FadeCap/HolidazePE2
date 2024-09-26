// src/Components/UserBookings.jsx
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
    <div>
      <h2 className="text-xl font-bold mb-2">My Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="border-b py-2">
              <p>
                Venue Name: {booking.venue?.name || "Unknown Venue"}<br />
                Dates: {new Date(booking.dateFrom).toLocaleDateString()} - {new Date(booking.dateTo).toLocaleDateString()}<br />
                Guests: {booking.guests}
              </p>
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
