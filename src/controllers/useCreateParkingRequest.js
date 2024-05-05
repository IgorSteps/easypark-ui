import { useState } from 'react';
import { createParkingRequest } from '../models/parkingRequest.js';

function useCreateParkingRequest() {
  const [error, setError] = useState(null);
  const [parkReq, setParkReq] = useState(null);

  const createRequest = async (requestBody) => {
    setError(null) // reset error.
    try {
      const response = await createParkingRequest(requestBody);

      setParkReq(response)
      return response;
    } catch (error) {
      setError(error.message);
    }
  };

  return { createRequest, parkReq, error};
}

export default useCreateParkingRequest;
