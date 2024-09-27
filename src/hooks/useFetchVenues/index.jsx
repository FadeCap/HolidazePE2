import { useState, useEffect } from "react";

function useFetchVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(
          "https://v2.api.noroff.dev/holidaze/venues"
        );
        if (!response.ok) {
          throw new Error("Error fetching venues");
        }
        const data = await response.json();
        setVenues(data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  return { venues, loading, error };
}

export default useFetchVenues;
