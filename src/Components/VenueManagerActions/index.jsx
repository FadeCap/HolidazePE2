const VenueManagerActions = ({ user }) => {
  if (!user || !user.venueManager) {
    return null;
  }

  return (
    <div className="mt-8 pl-4 pb-4">
      <h2 className="text-xl font-bold">Venue Manager Actions</h2>
      <button className="bg-green-500 text-white py-2 px-4 rounded mt-2">
        Add Venue
      </button>
      <button className="bg-yellow-500 text-white py-2 px-4 rounded mt-2 ml-2">
        Manage Venue
      </button>
      <button className="bg-red-500 text-white py-2 px-4 rounded mt-2 ml-2">
        Venue Bookings
      </button>
    </div>
  );
};

export default VenueManagerActions;
