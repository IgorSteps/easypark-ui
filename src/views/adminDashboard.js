import React, { useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import AdminNavbar from './components/admin/adminNavbar.js';
import DeleteParkingLotForm from './components/admin/deleteParkingLotForm.js';
import CreateParkingLotForm from './components/admin/createParkingLotForm.js';
import ParkingLotList from './components/admin/parkingLotList.js';

function AdminDashboard() {

    const [showCreateParkLotModal, setShowCreateParkLotModal] = useState(false);
    const handleCloseCreateParkLotModal = () => setShowCreateParkLotModal(false);
    const handleShowCreateParkLotModal = () => setShowCreateParkLotModal(true);

    const [showDeleteParkLotModal, setShowDeleteParkLotModal] = useState(false);
    const handleCloseDeleteParkLotModal = () => setShowDeleteParkLotModal(false);
    const handleShowDeleteParkLotModal = () => setShowDeleteParkLotModal(true);


    return (
        <>       
            <AdminNavbar />
            <Container className="mt-4">
            <Button className="mt-4 mb-4" variant="primary" onClick={handleShowCreateParkLotModal} data-test-id='create-park-lot-btn'>
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
                {" "}
                <Button className="mt-4 mb-4" variant="primary" onClick={handleShowDeleteParkLotModal} data-test-id='delete-park-lot-btn'>
                    Delete Parking Lot
                </Button>
                <Modal show={showDeleteParkLotModal} onHide={handleCloseDeleteParkLotModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Parking Lot</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DeleteParkingLotForm />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteParkLotModal} data-test-id='delete-park-lot-close-btn'>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                {" "}
                <ParkingLotList />
            </Container>
        </>
    )

}

export default AdminDashboard;