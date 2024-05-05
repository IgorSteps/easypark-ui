import React, { useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import DriverNavbar from "./components/driverNavbar.js";
import ParkingRequestForm from './components/parkingRequestForm.js';
import ParkingRequestList from './components/parkingRequestsList.js';

function DriverDashboard() {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    return (
        <>
            <DriverNavbar />
            <Container>

                <Button className="mt-4 mb-4" variant="primary" onClick={handleShowModal} data-test-id='create-park-req-btn'>
                    Create Parking Request
                </Button>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Parking Request</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ParkingRequestForm />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal} data-test-id='close-btn'>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <ParkingRequestList /> 

            </Container>
        </>
    )
}

export default DriverDashboard;