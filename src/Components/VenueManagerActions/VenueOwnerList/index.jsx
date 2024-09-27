import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateVenue from "../UpdateVenue";

const apiKey = import.meta.env.VITE_API_KEY;

const VenueOwnerList = () => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const username = JSON.parse(localStorage.getItem("user")).name;

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(
          "https://v2.api.noroff.dev/holidaze/venues?_owner=true&_bookings=true", // Fetch venues with booking data
          {
            headers: {
              "X-Noroff-API-Key": apiKey,
            },
          }
        );

        if (Array.isArray(response.data.data)) {
          const userVenues = response.data.data.filter(
            (venue) => venue.owner.name === username
          );
          setVenues(userVenues);
        } else {
          setError("Unexpected response structure");
        }
      } catch (error) {
        setError("Failed to fetch venues");
      }
    };

    fetchVenues();
  }, [username]);

  const openUpdateModal = (venue) => {
    setSelectedVenue(venue);
  };

  const handleDeleteVenue = async (venueId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this venue?"
    );

    if (!confirmDelete) {
      return;
    }

    const accessToken = localStorage.getItem("accessToken");

    try {
      await axios.delete(
        `https://v2.api.noroff.dev/holidaze/venues/${venueId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        }
      );
      setVenues((prevVenues) =>
        prevVenues.filter((venue) => venue.id !== venueId)
      );
      alert("Venue removed successfully.");
    } catch (error) {
      console.error("Error removing venue:", error);
      alert("Failed to remove venue. Please try again.");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Venues</h2>
      {venues.length > 0 ? (
        <ul>
          {venues.map((venue) => (
            <li
              key={venue.id}
              className="mb-2 p-4 border rounded-lg flex justify-between"
            >
              <div className="w-1/3">
                <h3 className="text-xl font-bold">{venue.name}</h3>
                <p>{venue.description}</p>
                {venue.media && venue.media.length > 0 ? (
                  <img
                    src={venue.media[0].url}
                    alt={venue.media[0].alt || "Venue Image"}
                    className="w-36 h-36 object-cover mt-2 rounded-lg"
                  />
                ) : (
                  <p>No image available for this venue.</p>
                )}
              </div>

              {/* Show bookings for this venue */}
              {venue.bookings && venue.bookings.length > 0 ? (
                <div className="mt-4 w-1/3">
                  <h4 className="font-semibold">Bookings:</h4>
                  {venue.bookings.map((booking) => (
                    <div key={booking.id} className="border-t mt-2 pt-2">
                      <p>Guests: {booking.guests}</p>
                      <p>Customer: {booking.customer.name} </p>
                      <p>Email: {booking.customer.email}</p>
                      <p>
                        Dates: {new Date(booking.dateFrom).toLocaleDateString()}{" "}
                        to {new Date(booking.dateTo).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No bookings available for this venue.</p>
              )}

              <div className="flex flex-col gap-4">
                {/* Update Venue Button */}
                <button
                  className="bg-yellow-500 text-white py-1 px-4 mt-2 rounded"
                  onClick={() => openUpdateModal(venue)}
                >
                  Update
                </button>

                {/* Delete Venue Button */}
                <button
                  className="bg-red-500 text-white py-1 px-4 mt-2 ml-2 rounded"
                  onClick={() => handleDeleteVenue(venue.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No venues found.</p>
      )}

      {/* UpdateVenue Modal */}
      {selectedVenue && (
        <UpdateVenue
          venue={selectedVenue}
          onClose={() => setSelectedVenue(null)}
          onUpdate={(updatedVenue) => {
            setVenues((prevVenues) =>
              prevVenues.map((v) =>
                v.id === updatedVenue.id ? updatedVenue : v
              )
            );
            setSelectedVenue(null);
          }}
        />
      )}
    </div>
  );
};

export default VenueOwnerList;
