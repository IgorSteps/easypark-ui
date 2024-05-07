import React from 'react';
import Driver from './driverCard.js';
import useGetDrivers from '../../controllers/useGetAllDrivers.js';
import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

function DriverList(){
    const {  drivers, fetchDrivers, error } = useGetDrivers();

    useEffect(() => {
        const fetchData = async () => {
            await fetchDrivers();
        };

        // Initially fetch data on component load.
        fetchData();

        // Set up interval to poll every 10 seconds.
        const intervalId = setInterval(fetchData, 10000);

        // Clean up interval on component unload.
        return () => clearInterval(intervalId);
    }, []);

    if (error) {
        return (
            <Alert data-test-id="get-drivers-error-alert" variant="danger">
                {"Failed to get all drivers: " + error}
            </Alert>
        )
    }
    if (drivers.length === 0) {
        return (
            <Alert data-test-id="no-parking-request-alert" variant="info">
                {"No drivers"}
            </Alert>
        )
    }

    return (
        <div>
            {drivers.map((driver, index) => (
                <Driver key={index} user={driver} />
            ))}
        </div>
    );
    
};

export default DriverList;