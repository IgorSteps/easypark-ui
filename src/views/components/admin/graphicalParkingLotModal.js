import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import GraphicalParkingLot from './graphicalParkingLot.js';

function GraphicalParkingLotModal({ show, onClose, parkingSpaces }) {
    return (
        <Modal size='lg' show={show} onHide={onClose} data-test-id='parking-lot-modal'>
            <Modal.Header closeButton data-test-id='parking-lot-modal-header'>
                <Modal.Title data-test-id='parking-lot-modal-title'>Parking spaces</Modal.Title>
            </Modal.Header>
            <Modal.Body data-test-id='parking-lot-modal-body'>
                <GraphicalParkingLot ParkingSpaces={parkingSpaces} />
            </Modal.Body>
            <Modal.Footer data-test-id='parking-lot-modal-footer'>
                <Button variant="secondary" onClick={onClose} data-test-id='parking-lot-modal-close-btn'>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default GraphicalParkingLotModal