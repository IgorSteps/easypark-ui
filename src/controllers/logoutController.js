import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../models/logoutService.js';
import { useState } from 'react';

const useLogoutController = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    setError(null) // reset error
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return {handleLogout, error};
};

export default useLogoutController;
