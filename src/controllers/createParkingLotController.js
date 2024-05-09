import { useNavigate } from 'react-router-dom';
import { createParkingLot } from '../models/createParkingLotService.js';
import { useState } from 'react';

const useCreateParkingLotController = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleParkingLotCreation = async (parkingLotDetails) => {
    try {
      console.debug(`Details are ${parkingLotDetails}`);
      await createParkingLot(parkingLotDetails);
      setError(null)
      navigate('/admin-dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return {handleParkingLotCreation, error};
};

export default useCreateParkingLotController;