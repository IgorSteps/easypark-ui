import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import useAdminGetParkingLots from '../../../controllers/useAdminGetParkingLot.js';
import ParkingLot from '../admin/parkingLotCard.js';

function ParkingLotsList() {
    const { parkLots, fetchParkLots, error} = useAdminGetParkingLots();
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

    if ( parkLots.length === 0) {
        return (
            <Alert data-test-id="no-alerts-alert" variant="info">
                {"No alerts"}
            </Alert>
        )
    }

   console.info("fetching parking requests for admin")
    return (
        <div>
            {parkLots.map((parkinglot, index) => (
                    <ParkingLot key={index} parkinglot={parkinglot} dataTestID={`parking-lot-${index}`} data-test-id={`parking-lot-${index}`} fetch={fetchParkLots}/>
            ))}
        </div>
    )
}

export default ParkingLotsList;
