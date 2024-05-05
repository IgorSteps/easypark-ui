import React, { useState, useEffect } from 'react';
import { Table, Alert, Container, Card, Button, Modal } from 'react-bootstrap';
import useGetParkingRequests from '../../controllers/useGetDriversParkingRequests.js';
import NotificationForm from './notificationForm.js';
import ParkingRequest from './parkingRequestCard.js';

function ParkingRequestList() {
    const {  parkingRequests, fetchParkingRequests, error } = useGetParkingRequests();

    useEffect(() => {
        const fetchData = async () => {
            await fetchParkingRequests();
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
            <Alert data-test-id="get-parking-requests-error-alert" variant="danger">
                {"Failed to get your parking requests: " + error}
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
   
    return (
        parkingRequests.map((parkingRequest, index) => (
                <ParkingRequest key={index} parkingRequest={parkingRequest} data-test-id='parking-request'/>
        ))
    )
}

export default ParkingRequestList;
