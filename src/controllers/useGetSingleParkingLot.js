import { useState } from 'react';
import { getSingleParkingLot } from '../models/parkingLot.js'

function useGetSingleParkingLot() {
    const [error, setError] = useState(null);
    const [parkingLot, setParkingLot] = useState(null);
    
    const fetchSingleParkingLot = async (id) => {
      setError(null); // reset error.
      try {
        const response = await getSingleParkingLot(id);
        setParkingLot(response);
      } catch (error) {
        setError(error.message);
      } 
    };
  
    return { parkingLot, fetchSingleParkingLot, error};
}

export default useGetSingleParkingLot;
