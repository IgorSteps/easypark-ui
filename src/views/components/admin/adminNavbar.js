import React, {useState} from 'react';
import {Container, Nav, Navbar, Button} from 'react-bootstrap'
import AccessabilityModal from '../accessabilityModal.js';
import LogoutAdminModal from './logoutAdminModal.js';

function AdminNavbar() {
   // Accessability Modal state.
   const [showAccessibilityModal, setShowAccessibilityModal] = useState(false);
   const handleAccessibilityClose = () => setShowAccessibilityModal(false);
   const handleAccessibilityShow = () => setShowAccessibilityModal(true);

   const [showLogoutModal, setShowLogoutModal] = useState(false);
   const handleLogoutClose = () => setShowLogoutModal(false);
   const handleLogoutShow = () => setShowLogoutModal(true);
   
  return (
    <>   
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/admin-parking-requests">Parking Requests</Nav.Link>
              <Nav.Link href="/alerts">Alerts</Nav.Link>
              <Nav.Link href="/notifications">Notifications</Nav.Link>
              <Nav.Link href="/admin-faq">FAQ</Nav.Link>
              <Nav.Link href="/manage-drivers">Manage Drivers</Nav.Link>
            </Nav>
            <Button className='mx-2' variant="primary" onClick={handleAccessibilityShow} data-test-id='accessibility-btn'>Accessability</Button>
            <Button className='mx-2' variant="primary" onClick={handleLogoutShow} data-test-id='logout-btn'>Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AccessabilityModal show={showAccessibilityModal} handleClose={handleAccessibilityClose} data-test-id='accessibility-modal'></AccessabilityModal>
      <LogoutAdminModal show={showLogoutModal} handleClose={handleLogoutClose} data-test-id='logout-modal'></LogoutAdminModal>
    </>
  );
}

export default AdminNavbar;