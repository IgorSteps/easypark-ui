import React, { useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import AdminNavbar from './components/admin/adminNavbar.js';
import CreateParkingLotForm from './components/admin/createParkingLotForm.js';
import ParkingLotList from './components/admin/parkingLotList.js';

function AdminDashboard() {

    const [showCreateParkLotModal, setShowCreateParkLotModal] = useState(false);
    const handleCloseCreateParkLotModal = () => setShowCreateParkLotModal(false);
    const handleShowCreateParkLotModal = () => setShowCreateParkLotModal(true);

    return (
        <>       
            <AdminNavbar />
            <Container className="mt-4">
            <Button className="mb-4" variant="primary" onClick={handleShowCreateParkLotModal} data-test-id='create-park-lot-btn'>
                    Create Parking Lot
                </Button>
                <Modal show={showCreateParkLotModal} onHide={handleCloseCreateParkLotModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Parking Lot</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateParkingLotForm />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCreateParkLotModal} data-test-id='create-close-btn'>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                
                <ParkingLotList />
            </Container>
        </>
    )

}

export default AdminDashboard;