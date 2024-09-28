// src/pages/VenueManagerPage.jsx
import React, { useState } from "react";
import AddVenue from "../../Components/VenueManagerActions/AddVenue";
import VenueOwnerList from "../../Components/VenueManagerActions/VenueOwnerList";
import BackButton from "../../Components/BackButton";
const VenueManagerPage = ({ user }) => {
  const [isAddVenueOpen, setAddVenueOpen] = useState(false);

  const toggleAddVenueModal = () => {
    setAddVenueOpen((prev) => !prev);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <BackButton to="/profile" label="< Back" />
      </div>
      <h1 className="text-2xl font-bold mb-4">Manage Your Venues</h1>
      <button
        onClick={toggleAddVenueModal}
        className="bg-green-700 text-white py-2 px-4 rounded mb-4"
      >
        Add Venue
      </button>

      {/* Show AddVenue modal */}
      <AddVenue isOpen={isAddVenueOpen} onClose={toggleAddVenueModal} />

      <VenueOwnerList />
    </div>
  );
};

export default VenueManagerPage;
