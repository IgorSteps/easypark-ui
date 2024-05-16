import { useState } from 'react';
import { getAllParkingLotsForDriver } from '../models/parkingLot.js'

function useGetParkingLotsForDriver() {
  const [error, setError] = useState(null);
  const [parkLots, setParkLots] = useState([]);
  
  const fetchParkLotsForDriver = async () => {
    setError(null); // reset errors.
    try {
      const response = await getAllParkingLotsForDriver();
      setParkLots(response);
    } catch (error) {
      setError(error.message);
    } 
  };

  return { parkLots, fetchParkLotsForDriver, error};
}

export default useGetParkingLotsForDriver;
