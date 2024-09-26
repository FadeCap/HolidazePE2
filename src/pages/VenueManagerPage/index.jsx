// src/pages/VenueManagerPage.jsx
import React from "react";
import VenueManagerActions from "../../Components/VenueManagerActions";

const VenueManagerPage = ({ user }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Your Venues</h1>
      <VenueManagerActions user={user} />
      {/* You can add more functionality here, like listing venues */}
    </div>
  );
};

export default VenueManagerPage;
