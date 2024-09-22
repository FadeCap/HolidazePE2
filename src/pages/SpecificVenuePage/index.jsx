// src/pages/SpecificVenuePage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SpecificVenuePage() {
  const { id } = useParams(); // Extracts the 'id' parameter from the URL
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch(`/api/venues/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Venue not found');
        }
        return response.json();
      })
      .then(data => {
        setVenue(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching venue:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!venue) {
    return <div className="text-center mt-10">Venue not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{venue.name}</h1>
      <p className="mb-2">{venue.description}</p>
      {/* Add more venue details here */}
      <div className="mt-4">
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Book Now
        </button>
      </div>
    </div>
  );
}

export default SpecificVenuePage;
