// src/pages/VenueManagerPage.jsx
import React, { useState } from "react";
import AddVenue from "../../Components/VenueManagerActions/AddVenue";

const VenueManagerPage = ({ user }) => {
  const [isAddVenueOpen, setAddVenueOpen] = useState(false);

  const toggleAddVenueModal = () => {
    setAddVenueOpen((prev) => !prev);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Your Venues</h1>
      <button
        onClick={toggleAddVenueModal}
        className="bg-green-500 text-white py-2 px-4 rounded mb-4"
      >
        Add Venue
      </button>

      {/* Show AddVenue modal */}
      <AddVenue isOpen={isAddVenueOpen} onClose={toggleAddVenueModal} />

     
      {/* You can add more components or functionality here, like listing venues */}
    </div>
  );
};

export default VenueManagerPage;
