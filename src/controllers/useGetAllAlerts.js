import { useState } from 'react';
import { getAllAlerts } from '../models/alert.js';

function useGetAllAlerts() {
  const [error, setError] = useState(null);
  const [alerts, setAlerts] = useState([]);
  
  const fetchAlerts = async () => {
    setError(null); // reset error.
    try {
      const response = await getAllAlerts();
      setAlerts(response);
    } catch (error) {
      setError(error.message);
    } 
  };

  return { alerts, fetchAlerts, error};
}

export default useGetAllAlerts;