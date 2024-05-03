import { useState } from 'react';
import { createParkingRequest } from '../models/parkingRequest.js';

function useParkingRequest() {
  const [error, setError] = useState(null);
  const [parkReq, setParkReq] = useState(null);

  const createRequest = async (requestBody) => {
    try {
      const response = await createParkingRequest(requestBody);
      console.debug(response.parkingRequest)
      setParkReq(response.parkingRequest)
      return response;
    } catch (error) {
      setError(error.message);
    }
  };

  return { createRequest, parkReq, error};
}

export default useParkingRequest;
