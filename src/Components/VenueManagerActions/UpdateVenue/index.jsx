import React, { useState } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

const UpdateVenue = ({ venue, onClose, onUpdate }) => {
  const [venueData, setVenueData] = useState({
    name: venue.name || "",
    description: venue.description || "",
    price: venue.price || 0,
    maxGuests: venue.maxGuests || 0,
    rating: venue.rating || 0,
    mediaUrl: venue.media?.[0]?.url || "",
    amenities: {
      wifi: venue.meta?.wifi || false,
      parking: venue.meta?.parking || false,
      breakfast: venue.meta?.breakfast || false,
      pets: venue.meta?.pets || false,
    },
    location: {
      country: venue.location?.country || "",
      city: venue.location?.city || "",
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("amenities.")) {
      const amenity = name.split(".")[1];
      setVenueData((prev) => ({
        ...prev,
        amenities: { ...prev.amenities, [amenity]: checked },
      }));
    } else if (name.startsWith("location.")) {
      const locField = name.split(".")[1];
      setVenueData((prev) => ({
        ...prev,
        location: { ...prev.location, [locField]: value },
      }));
    } else {
      setVenueData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.put(
        `https://v2.api.noroff.dev/holidaze/venues/${venue.id}`,
        {
          name: venueData.name,
          description: venueData.description,
          price: venueData.price,
          maxGuests: venueData.maxGuests,
          rating: venueData.rating,
          media: [{ url: venueData.mediaUrl, alt: "Venue Image" }],
          meta: venueData.amenities,
          location: venueData.location,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        }
      );
      onUpdate(response.data); // Call the onUpdate prop to update the list
      alert("Venue updated successfully!");
    } catch (error) {
      console.error("Error updating venue:", error);
      alert("Failed to update venue. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
        <h2 className="text-xl font-bold mb-4">Update Venue</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Venue Name</label>
            <input
              type="text"
              name="name"
              value={venueData.name}
              onChange={handleChange}
              className="border rounded w-full px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={venueData.description}
              onChange={handleChange}
              className="border rounded w-full px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={venueData.price}
              onChange={handleChange}
              className="border rounded w-full px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Max Guests</label>
            <input
              type="number"
              name="maxGuests"
              value={venueData.maxGuests}
              onChange={handleChange}
              className="border rounded w-full px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Rating (0-5)</label>
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              value={venueData.rating}
              onChange={handleChange}
              className="border rounded w-full px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Media URL</label>
            <input
              type="text"
              name="mediaUrl"
              value={venueData.mediaUrl}
              onChange={handleChange}
              className="border rounded w-full px-2 py-1"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white py-1 px-4 rounded">
            Update Venue
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white py-1 px-4 ml-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateVenue;
