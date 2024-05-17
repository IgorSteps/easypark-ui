import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ManageParkingLotForm from './manageParkingLotForm.js';

function ManageParkingSpaceModal({ show, onClose, parkingSpaces }) {
    return (
        <Modal size='lg' show={show} onHide={onClose} data-test-id='manage-parking-space-modal'>
            <Modal.Header closeButton data-test-id='manage-parking-space-modal-header'>
                <Modal.Title data-test-id='manage-parking-space-modal-title'>Manage Parking Space</Modal.Title>
            </Modal.Header>
            <Modal.Body data-test-id='manage-parking-space-modal-body'>
                <ManageParkingLotForm parkingSpaces={parkingSpaces} />
            </Modal.Body>
            <Modal.Footer data-test-id='manage-parking-space-modal-footer'>
                <Button variant="secondary" onClick={onClose} data-test-id='manage-parking-space-modal-close-btn'>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ManageParkingSpaceModal;