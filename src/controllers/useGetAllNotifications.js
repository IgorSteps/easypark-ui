import { useState } from 'react';
import { getAllNotifications } from '../models/notification.js';

function useGetAllNotifications() {
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  
  const fetchNotifications = async () => {
    setError(null); // reset error.
    try {
      const response = await getAllNotifications();
      setNotifications(response);
    } catch (error) {
      setError(error.message);
    } 
  };

  return { notifications, fetchNotifications, error};
}

export default useGetAllNotifications;