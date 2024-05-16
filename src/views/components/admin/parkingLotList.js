import React, { useState, useEffect } from 'react';
import { Table, Alert, Container, Card, Button, Modal } from 'react-bootstrap';
import useGetParkingLotsForAdmin from '../../../controllers/useGetParkingLotsForAdmin.js';
import ParkingLot from './parkingLotCard.js';

function ParkingLotList() {
    const { parkLots, fetchParkLotsForAdmin, error} = useGetParkingLotsForAdmin();

    useEffect(() => {
        const fetchData = async () => {
            await fetchParkLotsForAdmin();
        };

        fetchData();
        const intervalId = setInterval(fetchData, 10000);
        return () => clearInterval(intervalId);
    }, []);

    if (error) {
        return (
            <Alert data-test-id="get-parking-lots-error-alert" variant="danger">
                {"Failed to get parking lots: " + error}
            </Alert>
        )
    }

    if (parkLots.length === 0) {
        return (
            <Alert data-test-id="no-parking-lots-alert" variant="info">
                {"No parking lots"}
            </Alert>
        )
    }
   
    return (
        parkLots.map((lot, index) => (
                <ParkingLot key={index} parkingLot={lot} dataTestID={`parking-lot-${index}`} data-test-id={`parking-lot-${index}`}/>
        ))
    )
}

export default ParkingLotList;
