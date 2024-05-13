import React, {useState} from 'react';
import {Container, Nav, Navbar, Button} from 'react-bootstrap'
import AccessabilityModal from '../accessabilityModal.js';
function AdminNavbar() {
   // Accessability Modal state.
   const [showAccessibilityModal, setShowAccessibilityModal] = useState(false);
   const handleAccessibilityClose = () => setShowAccessibilityModal(false);
   const handleAccessibilityShow = () => setShowAccessibilityModal(true);

   
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
              <Nav.Link href="/admin-faq">FAQ</Nav.Link>
            </Nav>
            <Button className='mx-2' variant="primary" onClick={handleAccessibilityShow} data-test-id='accessibility-btn'>Accessability</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AccessabilityModal show={showAccessibilityModal} handleClose={handleAccessibilityClose} data-test-id='accessibility-modal'></AccessabilityModal>
    </>
  );
}

export default AdminNavbar;