import { useState } from 'react';
import { deleteParkingLot } from '../models/deleteParkingLot.js';

function useDeleteParkingLot() {
  const [error, setError] = useState(null);
  const [deleteParkLotResponse, setDeleteParkLotResponse] = useState(null);

  const handleParkingLotDeletion = async (id) => {
    setError(null);
    try {
      const response = await deleteParkingLot(id);
      setDeleteParkLotResponse(response);
    } catch (error) {
      setError(error.message);
    }
  };

  return { deleteParkLotResponse, handleParkingLotDeletion, error};
}

export default useDeleteParkingLot;
