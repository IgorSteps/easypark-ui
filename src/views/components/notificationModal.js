import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import NotificationForm from './notificationForm.js';

function NotificationModal({ show, onClose, parkingRequest }) {
    return (
        <Modal show={show} onHide={onClose} data-test-id='notification-modal'>
            <Modal.Header closeButton data-test-id='notification-modal-header'>
                <Modal.Title data-test-id='notification-modal-title'>Notify of arrival or departure</Modal.Title>
            </Modal.Header>
            <Modal.Body data-test-id='notification-modal-body'>
                <NotificationForm parkingRequestID={parkingRequest.ID} parkingSpaceID={parkingRequest.ParkingSpaceID} />
            </Modal.Body>
            <Modal.Footer data-test-id='notification-modal-footer'>
                <Button variant="secondary" onClick={onClose} data-test-id='notification-modal-close-btn'>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NotificationModal