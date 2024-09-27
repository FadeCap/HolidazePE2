import { useState, useEffect } from "react";
import axios from "axios";

const useFetchVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Track current page
  const [hasMore, setHasMore] = useState(true); // Track if more venues are available

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://v2.api.noroff.dev/holidaze/venues?_page=${page}&_limit=10`
        );
        setVenues((prevVenues) => [...prevVenues, ...response.data.data]);
        setHasMore(response.data.data.length > 0); // Check if more venues are available
      } catch (err) {
        setError("Failed to load venues");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [page]);

  return { venues, loading, error, hasMore, setPage };
};

export default useFetchVenues;
