import { useState } from 'react';
import { getAllParkingLots } from '../models/parkingLot.js'

function useParkingLots() {
  const [error, setError] = useState(null);
  const [parkLots, setParkLots] = useState([]);
  
  const fetchParkLots = async () => {
    setError(null); // reset errors.
    try {
      const response = await getAllParkingLots();
      setParkLots(response);
    } catch (error) {
      setError(error.message);
    } 
  };

  return { parkLots, fetchParkLots, error};
}

export default useParkingLots;
