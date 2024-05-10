import React, { useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import AdminNavbar from './components/admin/adminNavbar.js';
import DeleteParkingLotForm from './components/admin/deleteParkingLotForm.js';
import CreateParkingLotForm from './components/admin/createParkingLotForm.js';
import BanUserForm from './components/admin/banUserForm.js';

function AdminDashboard() {

    const [showCreateParkLotModal, setShowCreateParkLotModal] = useState(false);
    const handleCloseCreateParkLotModal = () => setShowCreateParkLotModal(false);
    const handleShowCreateParkLotModal = () => setShowCreateParkLotModal(true);

    const [showDeleteParkLotModal, setShowDeleteParkLotModal] = useState(false);
    const handleCloseDeleteParkLotModal = () => setShowDeleteParkLotModal(false);
    const handleShowDeleteParkLotModal = () => setShowDeleteParkLotModal(true);

    const [showBanUserModal, setShowBanUserModal] = useState(false);
    const handleCloseBanUserModal = () => setShowBanUserModal(false);
    const handleShowBanUserModal = () => setShowBanUserModal(true);

    return (
<>
            <AdminNavbar />
            <Container>
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
                <Button className="mt-4 mb-4" variant="primary" onClick={handleShowBanUserModal} data-test-id='ban-user-btn'>
                    Ban User
                </Button>
                <Modal show={showBanUserModal} onHide={handleCloseBanUserModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ban User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <BanUserForm />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseBanUserModal} data-test-id='ban-user-close-btn'>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    )
}

export default AdminDashboard;