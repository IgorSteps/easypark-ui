import React, { useState, useEffect } from 'react';
import { Table, Alert } from 'react-bootstrap';
import useParkingRequests from '../../controllers/useDriversParkingRequests.js';

function ParkingRequestList() {
    const {  parkingRequests, fetchParkingRequests, error } = useParkingRequests();
    
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

    if (parkingRequests.length === 0) {
        return (
            <Alert data-test-id="no-parking-request-alert" className='mt-4' variant="info">
                {"No parking requests"}
            </Alert>
        )
    }

    if (error) {
        return (
            <Alert data-test-id="get-parking-requests-error-alert" className='mt-4' variant="danger">
                {error}
            </Alert>
        )
    }

    // Function to format datetime strings to human-readable format
    const formatDateTime = (datetimeString) => {
        const date = new Date(datetimeString);
        return date.toLocaleString();
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Destination Parking Lot ID</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {parkingRequests.map((parkingRequest, index) => (
                    <tr key={index}>
                        {/* TODO: Truncate based on cell width */}
                        <td><span className="d-inline-block text-truncate" style={{ maxWidth: '150px' }}>{parkingRequest.ID}</span></td>
                        <td><span className="d-inline-block text-truncate" style={{ maxWidth: '150px' }}>{parkingRequest.UserID}</span></td>
                        <td><span className="d-inline-block text-truncate" style={{ maxWidth: '150px' }}>{parkingRequest.DestinationParkingLotID}</span></td>
                         <td>{formatDateTime(parkingRequest.StartTime)}</td>
                        <td>{formatDateTime(parkingRequest.EndTime)}</td>
                        <td>{parkingRequest.Status}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ParkingRequestList;
