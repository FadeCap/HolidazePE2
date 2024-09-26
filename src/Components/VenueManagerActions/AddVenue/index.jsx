// src/Components/AddVenue.jsx
import React, { useState } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

const AddVenue = ({ isOpen, onClose }) => {
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    price: 0,
    maxGuests: 0,
    rating: 0,
    mediaUrl: "",
    amenities: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      country: "",
      city: "",
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
      const response = await axios.post(
        "https://v2.api.noroff.dev/holidaze/venues",
        {
          ...venueData,
          media: [{ url: venueData.mediaUrl, alt: "Venue Image" }],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        }
      );
      alert("Venue added successfully!");
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error adding venue:", error);
      alert("Failed to add venue. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Venue</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Venue Name</label>
            <input
              type="text"
              name="name"
              value={venueData.name}
              onChange={handleChange}
              required
              className="border rounded w-full px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={venueData.description}
              onChange={handleChange}
              required
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
              required
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
              required
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
          <div className="mb-4">
            <h3 className="font-semibold">Amenities</h3>
            {["wifi", "parking", "breakfast", "pets"].map((amenity) => (
              <div key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  name={`amenities.${amenity}`}
                  checked={venueData.amenities[amenity]}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</label>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="block mb-1">Country</label>
            <input
              type="text"
              name="location.country"
              value={venueData.location.country}
              onChange={handleChange}
              className="border rounded w-full px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">City</label>
            <input
              type="text"
              name="location.city"
              value={venueData.location.city}
              onChange={handleChange}
              className="border rounded w-full px-2 py-1"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Add Venue
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 border border-gray-300 py-2 px-4 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVenue;
