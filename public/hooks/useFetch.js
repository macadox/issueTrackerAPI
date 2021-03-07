import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(url);
      const data = await response.json();

      setData(data.data.data);
      setLoading(false);
    };
    getData();
  }, []);

  return { data, loading };
};
