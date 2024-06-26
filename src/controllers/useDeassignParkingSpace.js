import { useState } from 'react';
import { deassignParkingSpace } from '../models/parkingRequest.js';

function useDeassignParkingSpace() {
  const [deassignError, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  const deassign = async (parkingRequestID) => {
    setError(null) // reset error.
    try {
      const response = await deassignParkingSpace(parkingRequestID);
      setMsg(response)
      return response;
    } catch (error) {
      setError(error.message);
    }
  };

  return { deassign, msg, deassignError};
}

export default useDeassignParkingSpace;