import { useState } from 'react';
import { manageParkingLot } from '../models/manageParkingLot.js';

function useManageParkingLot() {
  const [error, setError] = useState(null);
  const [manageParkLot, setManageParkLot] = useState(null);

  const handleParkingLotManage = async (chosenLot) => {
    setError(null);
    try {
      if (chosenLot.chosenLotID === "Invalid" || chosenLot.chosenLotID === ""){
        throw new Error("Please choose a valid parking lot");
      }
      const response = await manageParkingLot(chosenLot);
      setManageParkLot(response);
    } catch (error) {
      setError(error.message);
    }
  };

  return { manageParkLot, handleParkingLotManage, error};
}

export default useManageParkingLot;
