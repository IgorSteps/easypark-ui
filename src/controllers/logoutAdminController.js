import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../models/logoutService.js';

const useAdminLogoutController = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate('/admin-login');
    
  };

  return {handleLogout};
};

export default useAdminLogoutController;
