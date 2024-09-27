import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateVenue from "../UpdateVenue";

const apiKey = import.meta.env.VITE_API_KEY;

const VenueOwnerList = () => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null); // State for selected venue
  const username = JSON.parse(localStorage.getItem("user")).name;

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(
          "https://v2.api.noroff.dev/holidaze/venues?_owner=true",
          {
            headers: {
              "X-Noroff-API-Key": apiKey,
            },
          }
        );

        // Filter the venues by owner
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

  // Function to open the modal for a specific venue
  const openUpdateModal = (venue) => {
    setSelectedVenue(venue);
  };

  // Function to delete a venue
  const handleDeleteVenue = async (venueId) => {
    // Show a confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this venue?");
  
    if (!confirmDelete) {
      return; // If the user cancels, exit the function
    }
  
    const accessToken = localStorage.getItem("accessToken");
  
    try {
      await axios.delete(`https://v2.api.noroff.dev/holidaze/venues/${venueId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
      });
      // Remove the venue from the state after successful deletion
      setVenues((prevVenues) => prevVenues.filter((venue) => venue.id !== venueId));
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
            <li key={venue.id} className="mb-2 p-4 border rounded-lg flex justify-between">
              <div>
              <h3 className="text-xl font-bold">{venue.name}</h3>
              <p>{venue.description}</p>
              {venue.media && venue.media.length > 0 ? (
                <img
                  src={venue.media[0].url}
                  alt={venue.media[0].alt || 'Venue Image'}
                  className="w-36 h-36 object-cover mt-2 rounded-lg"
                />
              ) : (
                <p>No image available for this venue.</p>
              )}
              </div>
              <div className="flex flex-col gap-4">
              {/* Update Venue Button */}
              <button
                className="bg-yellow-500 text-white py-1 px-4 mt-2 rounded"
                onClick={() => openUpdateModal(venue)}
              >
                Update Venue
              </button>

              {/* Delete Venue Button */}
              <button
                className="bg-red-500 text-white py-1 px-4 mt-2 ml-2 rounded"
                onClick={() => handleDeleteVenue(venue.id)} // Delete venue on click
              >
                Remove Venue
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
          onClose={() => setSelectedVenue(null)} // Close the modal
          onUpdate={(updatedVenue) => {
            // Update the list of venues after successful update
            setVenues((prevVenues) =>
              prevVenues.map((v) => (v.id === updatedVenue.id ? updatedVenue : v))
            );
            setSelectedVenue(null); // Close the modal after update
          }}
        />
      )}
    </div>
  );
};

export default VenueOwnerList;
