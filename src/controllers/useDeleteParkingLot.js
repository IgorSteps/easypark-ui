import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { deleteParkingLot } from '../models/deleteParkingLot.js';

function useDeleteParkingLot() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleParkingLotDeletion = async (chosenLot) => {
    setError(null);
    try {
      if (chosenLot.chosenLotID === "Invalid" || chosenLot.chosenLotID === ""){
        throw new Error("Please choose a valid parking lot");
      }
      await deleteParkingLot(chosenLot);
      setError(null);
      navigate('/admin-dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return { handleParkingLotDeletion, error};
}

export default useDeleteParkingLot;
