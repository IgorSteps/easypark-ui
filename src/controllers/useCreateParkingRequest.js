import { useState } from 'react';
import { createParkingRequest } from '../models/parkingRequest.js';

/** useCreateParkingRequest is a React hook that fetches all parking lots */
function useCreateParkingRequest() {
  const [error, setError] = useState(null);
  const [parkReq, setParkReq] = useState(null);

  const createParkingRequest = async (requestBody) => {
    setError(null) // reset error.
    try {
      const response = await createParkingRequest(requestBody);
      console.debug("create parking request response", response)
      setParkReq(response)
      return response;
    } catch (error) {
      setError(error.message);
    }
  };

  return { createParkingRequest, parkReq, error};
}

export default useCreateParkingRequest;
