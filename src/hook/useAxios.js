import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://dummyjson.com";

export function useAxios({ axiosParams }) {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData(params) {
    try {
      const response = await axios.request(params);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData(axiosParams);
  }, []);

  return { data, error, isLoading };
}
