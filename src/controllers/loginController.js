import { useNavigate } from 'react-router-dom';
import { loginUser } from '../models/loginService.js';

/** loginController is a React Hook that acts as a Controller that handles reading data from
 * the loginService Model and updating the login View based */
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
