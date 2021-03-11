import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context';

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { dispatchErrorAndRedirectTo } = useGlobalContext();

  useEffect(() => {
    const getData = async () => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'error' || data.status === 'fail') {
            console.error(data.message);
            dispatchErrorAndRedirectTo(data.message, '/error');
          } else {
            setData(data.data.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          dispatchErrorAndRedirectTo(err, '/error');
        });
    };
    getData();
  }, []);

  return { data, loading };
};
