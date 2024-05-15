import React, { useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import AdminNavbar from './components/admin/adminNavbar.js';
import  ParkingLotsList from './components/admin/lotsList.js';
import DeleteParkingLotForm from './components/admin/deleteParkingLotForm.js';
import CreateParkingLotForm from './components/admin/createParkingLotForm.js';

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
                <ParkingLotsList />
            </Container>
        </>
    )

}

export default AdminDashboard;