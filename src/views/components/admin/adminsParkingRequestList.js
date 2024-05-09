import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import useGetAllParkingRequests from '../../../controllers/useGetAllParkingRequests.js';
import ParkingRequest from '../admin/parkingRequestCard.js';

function ParkingRequestList() {
    const {  parkingRequests, fetchParkingRequests, error } = useGetAllParkingRequests();
    useEffect(() => {
        const fetchData = async () => {
            await fetchParkingRequests();
        };

        fetchData();
        const intervalId = setInterval(fetchData, 10000); // 10 secs.
        return () => clearInterval(intervalId);
    }, []);

    if (error) {
        return (
            <Alert data-test-id="get-parking-requests-error-alert" variant="danger">
                {"Failed to get parking requests: " + error}
            </Alert>
        )
    }

    if (parkingRequests.length === 0) {
        return (
            <Alert data-test-id="no-parking-request-alert" variant="info">
                {"No parking requests"}
            </Alert>
        )
    }
   console.info("fetching parking requests for admin")
    return (
        parkingRequests.map((parkingRequest, index) => (
                <ParkingRequest 
                    key={index}
                    parkingRequest={parkingRequest}
                    dataTestID={`parking-request-${index}`}
                    data-test-id={`parking-request-${index}`}
                    fetch={fetchParkingRequests}
                    />
        ))
    )
}

export default ParkingRequestList;
