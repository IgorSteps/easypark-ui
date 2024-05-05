import { useState } from 'react';
import {getAllParkingRequests} from '../models/parkingRequest.js'

function useParkingRequests() {
  const [error, setError] = useState(null);
  const [parkingRequests, setParkingRequests] = useState([]);
  
  // Function to fetch all parking requests for a driver
  const fetchParkingRequests = async (token) => {
    setError(null); // reset errors.
    try {
      const response = await getAllParkingRequests(token);
      setParkingRequests(response);
    } catch (error) {
      setError(error.message);
    } 
  };

  return { parkingRequests, fetchParkingRequests, error};
}

export default useParkingRequests;
