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
      {/* Back button and header */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <BackButton to="/profile" label="< Back" />
        <h1 className="text-2xl font-bold">Manage Your Venues</h1>
      </div>

      {/* Add Venue Button */}
      <button
        onClick={toggleAddVenueModal}
        className="bg-green-700 text-white py-2 px-4 rounded mb-4 w-full sm:w-auto"
      >
        Add Venue
      </button>

      {/* Show AddVenue modal */}
      <AddVenue isOpen={isAddVenueOpen} onClose={toggleAddVenueModal} />

      {/* Venue list */}
      <VenueOwnerList />
    </div>
  );
};

export default VenueManagerPage;
