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
   

    // Function to format date time objects to human-readable format.
    const formatDateTime = (datetimeString) => {
        const date = new Date(datetimeString);
        return date.toLocaleString();
    };

    console.debug("got all parking requests for driver", parkingRequests)
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Destination Parking Lot</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {parkingRequests.map((parkingRequest, index) => (
                    <tr key={index}>
                        {/* TODO: Truncate based on cell width */}
                        <td><span className="d-inline-block text-truncate" style={{ maxWidth: '150px' }} data-test-id={`parking-request-id-${index}`}>{parkingRequest.ID}</span></td>
                        <td><span className="d-inline-block text-truncate" style={{ maxWidth: '150px' }} data-test-id={`parking-request-destination-lot-name-${index}`}>{parkingRequest.DestinationParkingLotName}</span></td>
                        <td data-test-id={`parking-request-start-time-${index}`}>{formatDateTime(parkingRequest.StartTime)}</td>
                        <td data-test-id={`parking-request-end-time-${index}`}>{formatDateTime(parkingRequest.EndTime)}</td>
                        <td data-test-id={`parking-request-status-${index}`}>{parkingRequest.Status}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ParkingRequestList;
