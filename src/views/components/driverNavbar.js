import React, { useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import ChatModal from './chatModal.js';
import AccessabilityModal from './accessabilityModal.js';
import LogoutDriverModal from './logoutDriverModal.js';

function DriverNavbar() {
  const [showChatModal, setShowChatModal] = useState(false);
  const handleOpenChatModal = () => {
    setShowChatModal(true);
  };

  const handleCloseChatModal = () => {
    setShowChatModal(false);
  };

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
          <Navbar.Brand href="/driver-dashboard">Easypark</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={handleOpenChatModal} data-test-id="message-admin-link">
                Message admin
              </Nav.Link>
              <Nav.Link href='/faq' data-test-id="faq-link">
                FAQ
              </Nav.Link>
            </Nav>
            <Button className='mx-2' variant="primary" onClick={handleAccessibilityShow} data-test-id='accessibility-btn'>Accessability</Button>
            <Button className='mx-2' variant="primary" onClick={handleLogoutShow} data-test-id='logout-btn'>Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ChatModal receiverID={process.env.ADMIN_ID} show={showChatModal} handleClose={handleCloseChatModal} data-test-id="chat-modal" />
      <AccessabilityModal show={showAccessibilityModal} handleClose={handleAccessibilityClose} data-test-id='accessibility-modal'></AccessabilityModal>
      <LogoutDriverModal show={showLogoutModal} handleClose={handleLogoutClose} data-test-id='logout-modal'></LogoutDriverModal>
    </>
  );
}

export default DriverNavbar;
