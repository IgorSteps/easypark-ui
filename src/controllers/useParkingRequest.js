import { useState } from 'react';
import { createParkingRequest } from '../models/parkingRequest.js';

function useParkingRequest() {
  const [error, setError] = useState(null);
  const [parkReq, setParkReq] = useState(null);

  const createRequest = async (requestBody) => {
    setError(null)

    if (requestBody.destinationLotID === '' || requestBody.destinationLotID === undefined) {
      setError("please choose destination");
      return
    }
    try {
      const response = await createParkingRequest(requestBody);
      console.debug("create parking request response", response)
      setParkReq(response)
      return response;
    } catch (error) {
      setError(error.message);
    }
  };

  return { createRequest, parkReq, error};
}

export default useParkingRequest;
