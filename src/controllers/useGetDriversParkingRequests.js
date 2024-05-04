import { useState } from 'react';
import {getAllParkingRequests} from '../models/parkingRequest.js'

/** useGetParkingRequests is a React hook that fetches all parking requests for a driver */
function useGetParkingRequests() {
  const [error, setError] = useState(null);
  const [parkingRequests, setParkingRequests] = useState([]);
  
  const fetchParkingRequests = async (token) => {
    setError(null) // reset error
    try {
      const response = await getAllParkingRequests(token);
      setParkingRequests(response);
    } catch (error) {
      setError(error.message);
    } 
  };

  return { parkingRequests, fetchParkingRequests, error};
}

export default useGetParkingRequests;
