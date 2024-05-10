import { useState } from 'react';
import { deleteParkingLot } from '../models/deleteParkingLot.js';

function useDeleteParkingLot() {
  const [error, setError] = useState(null);
  const [deleteParkLot, setDeleteParkLot] = useState(null);

  const handleParkingLotDeletion = async (chosenLot) => {
    setError(null);
    try {
      if (chosenLot.chosenLotID === "Invalid" || chosenLot.chosenLotID === ""){
        throw new Error("Please choose a valid parking lot");
      }
      const response = await deleteParkingLot(chosenLot);
      setDeleteParkLot(response);
    } catch (error) {
      setError(error.message);
    }
  };

  return { deleteParkLot,handleParkingLotDeletion, error};
}

export default useDeleteParkingLot;
