import { useState } from 'react';
import { banUser } from '../models/banUser.js';

function useBanUser() {
  const [banUserError, setError] = useState(null);
  const [banUserResult, setBanUser] = useState(null);

  const handleBanUser = async (banID) => {
    setError(null);
    try {
      if (banID.id === "Invalid" || banID.id === ""){
        throw new Error("Please choose a valid user");
      }
      const response = await banUser(banID);
      setBanUser(response);
    } catch (error) {
      setError(error.message);
    }
  };

  return { banUserResult,handleBanUser,banUserError};
}

export default useBanUser;
