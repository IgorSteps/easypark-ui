import { useNavigate } from 'react-router-dom';
import { loginUser } from '../models/loginService.js';
import { useState } from 'react';

/** useAdminLoginController is a React Hook that handles reading data from
 * the loginService and updating the login form */
const useAdminLoginController = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
  
    const handleLogin = async (credentials) => {
      setError(null) // reset error
      try {
        await loginUser(credentials);
        navigate('/admin-dashboard');
      } catch (error) {
        setError(error.message);
      }
    };
  
    return {handleLogin, error};
  };
  
  export default useAdminLoginController;
  