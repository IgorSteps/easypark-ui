import { useNavigate } from 'react-router-dom';
import { registerUser } from '../models/registerService.js';
import { useState } from 'react';

const useRegisterController = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleRegister = async (credentials) => {
    try {
      await registerUser(credentials);
      setError(null)
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };
  return {handleRegister, error};
};

export default useRegisterController;
