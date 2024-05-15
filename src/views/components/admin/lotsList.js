import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import useGetParkingLots from '../../../controllers/useGetParkingLot.js';
import ParkingLot from '../admin/parkingLotCard.js';

function ParkingLotsList() {
    const {  parkingLots, fetchParkLots, error } = useGetParkingLots();
    useEffect(() => {
        const fetchData = async () => {
            await fetchParkLots();
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

    if (parkingLots && parkingLots.length === 0) {
        return (
            <Alert data-test-id="no-alerts-alert" variant="info">
                {"No alerts"}
            </Alert>
        )
    }

   console.info("fetching parking requests for admin")
    return (
        parkingLots && parkingLots.map((parkingLots, index) => (
                <ParkingLot key={index} parkinglot={parkinglot} dataTestID={`alerts-${index}`} data-test-id={`alerts-${index}`} fetch={fetchParkLots}/>
        ))
    )
}

export default ParkingLotsList;
