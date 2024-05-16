import { useState } from 'react';
import { getAllParkingLotsForAdmin } from '../models/parkingLot.js'

function useGetParkingLotsForAdmin() {
  const [error, setError] = useState(null);
  const [parkLots, setParkLots] = useState([]);
  
  const fetchParkLotsForAdmin = async () => {
    setError(null); // reset errors.
    try {
      const response = await getAllParkingLotsForAdmin();
      setParkLots(response);
    } catch (error) {
      setError(error.message);
    } 
  };

  return { parkLots, fetchParkLotsForAdmin, error};
}

export default useGetParkingLotsForAdmin;
