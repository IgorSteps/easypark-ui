import { useState } from 'react';
import { deassignParkingSpace } from '../models/parkingRequest.js';

function useDeassignParkingSpace() {
  const [error, setError] = useState(null);

  const deassign = async (parkingRequestID) => {
    setError(null) // reset error.
    try {
      const response = await deassignParkingSpace(parkingRequestID);

      return response;
    } catch (error) {
      setError(error.message);
    }
  };

  return { deassign, error};
}

export default useDeassignParkingSpace;