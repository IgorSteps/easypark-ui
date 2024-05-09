import React, {useState, useEffect} from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import useGetSingleParkingLot from '../../../controllers/useGetSingleParkingLot.js'
import ParkingLot from './parkingLot.js';

function ParkingLotModal({ show, onClose, parkingLotID, startTime, endTime }) {
    const {parkingLot, fetchSingleParkingLot, error} = useGetSingleParkingLot()
    const [parkingLotFetched, setParkingLotFetched] = useState(false);
    useEffect(() => {
        if (!parkingLotFetched){
            fetchSingleParkingLot(parkingLotID);    
            setParkingLotFetched(true);
        }
    }, [parkingLotFetched, parkingLotID, startTime, endTime, fetchSingleParkingLot]);

    if (error != null) {
        return (
            <Alert variant="danger">
                Failed to get parking lot information.
            </Alert>
        )
    }

    return (
        <Modal size='lg' show={show} onHide={onClose} data-test-id='parking-lot-modal'>
            <Modal.Header closeButton data-test-id='parking-lot-modal-header'>
                <Modal.Title data-test-id='parking-lot-modal-title'>Choose parking space</Modal.Title>
            </Modal.Header>
            <Modal.Body data-test-id='parking-lot-modal-body'>
                <ParkingLot parkingLotData={parkingLot} selectedTime={{startTime, endTime}} />
            </Modal.Body>
            <Modal.Footer data-test-id='parking-lot-modal-footer'>
                <Button variant="secondary" onClick={onClose} data-test-id='parking-lot-modal-close-btn'>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ParkingLotModal