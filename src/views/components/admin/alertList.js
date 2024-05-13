import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import useGetAllAlerts from '../../../controllers/useGetAllAlerts.js';
import OurAlert from './alertCard.js';

function AlertList() {
    const {  alerts, fetchAlerts, error } = useGetAllAlerts();
    useEffect(() => {
        const fetchData = async () => {
            await fetchAlerts();
        };

        fetchData();
        const intervalId = setInterval(fetchData, 10000); // 10 secs.
        return () => clearInterval(intervalId);
    }, []);

    if (error) {
        return (
            <Alert data-test-id="get-alerts-error-alert" variant="danger">
                {"Failed to get alerts: " + error}
            </Alert>
        )
    }

    if (alerts && alerts.length === 0) {
        return (
            <Alert data-test-id="no-alerts-alert" variant="info">
                {"No alerts"}
            </Alert>
        )
    }
   
    return (
        alerts && alerts.map((alert, index) => (
                <OurAlert key={index} alert={alert} dataTestID={`alerts-${index}`} data-test-id={`alerts-${index}`}/>
        ))
    )
}

export default AlertList;
