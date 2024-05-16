import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../models/logoutService.js';

const useDriverLogoutController = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
    
  };

  return {handleLogout};
};

export default useDriverLogoutController;
