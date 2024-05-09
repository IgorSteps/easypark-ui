import { useState } from 'react';
import { updateParkingRequestStatus } from '../models/parkingRequest.js';

function useUpdateParkingRequestStatus() {
    const [updateStatusError, setError] = useState(null);
    const [responseMsg, setResponseMsg] = useState('')

    const updateStatus = async (parkingReqID, requestBody) => {
            setError(null) // reset error.
            try {
                const response = await updateParkingRequestStatus(parkingReqID, requestBody);
                setResponseMsg(response)
                return response;
            } catch (error) {
                setError(error.message);
            }
    };

    return { updateStatus, responseMsg, updateStatusError};
}

export default useUpdateParkingRequestStatus;