import { useNavigate } from 'react-router-dom';
import { loginUser } from '../models/loginService.js';
import { useState } from 'react';

/** loginController is a React Hook that handles reading data from
 * the loginService and updating the login form */
const useLoginController = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async (credentials) => {
    try {
      await loginUser(credentials);
      setError(null)
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return {handleLogin, error};
};

export default useLoginController;
