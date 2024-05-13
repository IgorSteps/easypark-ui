import { useState } from 'react';
import { createPaymentRequest } from '../models/paymentRequest.js';

function useCreatePayment() {
  const [error, setError] = useState(null);
  const [payReq, setPayReq] = useState(null);

  const createRequest = async (requestBody) => {
    setError(null) // reset error.
    try {
      const response = await createPaymentRequest(requestBody);

      setPayReq(response)
      return response;
    } catch (error) {
      setError(error.message);
    }
  };

  return { createRequest, payReq, error};
}

export default useCreatePayment;
