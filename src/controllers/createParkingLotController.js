import { useNavigate } from 'react-router-dom';
import { createParkingLot } from '../models/createParkingLotService.js';
import { useState } from 'react';

const useCreateParkingLotController = () => {
  const [error, setError] = useState(null);
  const [parkLot, setParkLot] = useState(null);

  const handleParkingLotCreation = async (parkingLotDetails) => {
    try {
      const response = await createParkingLot(parkingLotDetails);
      setError(null)
      setParkLot(response);
      return response
    } catch (error) {
      setError(error.message);
    }
  };

  return {parkLot,handleParkingLotCreation, error};
};

export default useCreateParkingLotController;