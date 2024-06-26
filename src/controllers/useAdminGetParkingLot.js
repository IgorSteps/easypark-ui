import { useState } from 'react';
import { getAdminAllParkingLots } from '../models/adminParkingLot.js';

function useAdminGetParkingLots() {
  const [error, setError] = useState(null);
  const [parkLots, setParkLots] = useState([]);
  
  const fetchParkLots = async () => {
    setError(null); // reset errors.
    try {
      const response = await getAdminAllParkingLots();
      setParkLots(response);
    } catch (error) {
      setError(error.message);
    } 
  };

  return { parkLots, fetchParkLots, error};
}

export default useAdminGetParkingLots;
