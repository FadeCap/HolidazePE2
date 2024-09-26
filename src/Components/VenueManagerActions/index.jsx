// src/Components/VenueManagerActions/index.jsx
import React from "react";
import ManageVenue from "./ManageVenue"; // Import your ManageVenue component
import VenueBookings from "./VenueBookings"; // Import your VenueBookings component

const VenueManagerActions = ({ user }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Your Venue Actions</h2>
      <ManageVenue user={user} />
      <VenueBookings user={user} />
    </div>
  );
};

export default VenueManagerActions;
