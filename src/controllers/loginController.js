import { useNavigate } from 'react-router-dom';
import { loginUser } from '../models/loginService.js';

/** useLoginController is a React hook that acts as a controller */
const useLoginController = () => {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      await loginUser(credentials);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      // TODO: Handle error correctly
    }
  };

  return handleLogin;
};

export default useLoginController;
