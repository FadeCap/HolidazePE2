import { useState, useEffect } from 'react';
import VenueCard from "../../UI/venueCard";

function Venues() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const getVenues = async () => {
      try {
        const response = await fetch('https://v2.api.noroff.dev/holidaze/venues');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched venues data:', data); // Confirm data structure
        setVenues(data.data); // Use the data array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getVenues();
  }, []);

  return (
    <div>
      <VenueCard venues={venues} />
    </div>
  );
}

export default Venues;
