import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PaymentRequestForm from './paymentRequestForm.js';

function PaymentModal({ show, onClose }) {
    return (
        <Modal show={show} onHide={onClose} data-test-id='payment-modal'>
            <Modal.Header closeButton data-test-id='payment-modal-header'>
                <Modal.Title data-test-id='payment-modal-title'>Make Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body data-test-id='payment-modal-body'>
                <PaymentRequestForm />
            </Modal.Body>
            <Modal.Footer data-test-id='payment-modal-footer'>
                <Button variant="secondary" onClick={onClose} data-test-id='payment-modal-close-btn'>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PaymentModal