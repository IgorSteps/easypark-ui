import { useState } from 'react';
import { automaticallyAssignParkingSpace } from '../models/parkingRequest.js';

function useAutomaticallyAssignParkSpace() {
  const [error, setError] = useState(null);
  const [space, setSpace] = useState(null);
  
  const automaticallyAssign = async (requestBody) => {
    setError(null) // reset error.
    try {
      const response = await automaticallyAssignParkingSpace(requestBody);

      setSpace(response)
      return response;
    } catch (error) {
      setError(error.message);
    }
  };

  return { automaticallyAssign, space, error};
}

export default useAutomaticallyAssignParkSpace;