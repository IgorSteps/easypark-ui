import { useState } from 'react';
import { createNotification } from '../models/notification.js';

function useCreateNotification() {
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const create = async (requestBody) => {
    console.debug(requestBody)
    setError(null) // reset error.
    try {
      const response = await createNotification(requestBody);

      setNotification(response)
      return response;
    } catch (error) {
      setError(error.message);
    }
  };

  return { create, notification, error};
}

export default useCreateNotification;