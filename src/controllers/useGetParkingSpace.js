import { useState } from 'react';
import { getSingleParkingSpace } from '../models/parkingSpace.js';

function useGetParkingSpace() {
  const [error, setError] = useState(null);
  const [parkingSpace, setParkingSpace] = useState(null);
  
  const fetchSingleParkingSpace = async (parkingSpaceID) => {
    setError(null); // reset error.
    try {
      const response = await getSingleParkingSpace(parkingSpaceID);
      setParkingSpace(response);
    } catch (error) {
      setError(error.message);
    } 
  };

  return { parkingSpace, fetchSingleParkingSpace, error};
}

export default useGetParkingSpace;
