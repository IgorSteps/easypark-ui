import { useState } from 'react';
import { getAllParkingLots } from '../models/parkingLot.js'

/** useGetParkingLots is a React hook that fetches all parking lots */
function useGetParkingLots() {
  const [error, setError] = useState(null);
  const [parkLots, setParkLots] = useState([]);
  
  const fetchParkLots = async () => {
    try {
      const response = await getAllParkingLots();
      setParkLots(response);
    } catch (error) {
      setError(error.message);
    } 
  };

  return { parkLots, fetchParkLots, error};
}

export default useGetParkingLots;
