import React from 'react';
import Driver from './driverCard.js';
import useGetDrivers from '../../controllers/useGetAllDrivers.js';
import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

function DriverList(){
    const {  drivers, fetchDrivers, error } = useGetDrivers();

    // Fetch drivers every 10 seconds.
    useEffect(() => {
        const fetchData = async () => {
            await fetchDrivers();
        };

        fetchData();
        const intervalId = setInterval(fetchData, 10000);
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
            <Alert data-test-id="no-drivers-alert" variant="info">
                {"No drivers"}
            </Alert>
        )
    }

    return (
        <div>
            {drivers.map((driver, index) => (
                <Driver data-test-id={`driver-${index}`} dataTestID={`driver-${index}`} key={index} user={driver} />
            ))}
        </div>
    );
    
};

export default DriverList;