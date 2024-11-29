import { useState, useEffect } from "react";
import axios from "axios";

const useData = () => {
  const [workData, setWorkData] = useState([]);
  const API_URL = `https://api.github.com/users/fabpot/followers`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(API_URL);
        setWorkData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return { workData };
};

export default useData;