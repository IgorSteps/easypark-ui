import { useState } from 'react';
import { getAllDrivers } from '../models/driver.js'

function useGetDrivers() {
  const [error, setError] = useState(null);
  const [drivers, setDrivers] = useState([]);
  
  const fetchDrivers = async () => {
    setError(null); // reset errors.
    try {
      const response = await getAllDrivers();
      setDrivers(response);
    } catch (error) {
      setError(error.message);
    } 
  };

  return { drivers, fetchDrivers, error};
}

export default useGetDrivers;