import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function ImageModal({ show, image, onClose }) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Map to parking space</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img data-test-id='image-map' src={image} alt="Parking Lot Map" style={{ maxWidth: '100%', height: 'auto' }} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ImageModal