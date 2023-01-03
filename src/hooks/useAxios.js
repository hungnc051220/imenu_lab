import { useState, useEffect } from "react";
import axiosInstance from "../api";

const useAxios = (config) => {
  const { method, url, requestConfig = {} } = config;
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setError(null);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return [data, loading, error];
};

export default useAxios;
