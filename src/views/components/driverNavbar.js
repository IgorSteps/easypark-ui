import React, { useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import ChatModal from './chatModal.js';

function DriverNavbar() {
  const [showChatModal, setShowChatModal] = useState(false);

  const handleOpenChatModal = () => {
    setShowChatModal(true);
  };

  const handleCloseChatModal = () => {
    setShowChatModal(false);
  };

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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ChatModal receiverID={process.env.ADMIN_ID} show={showChatModal} handleClose={handleCloseChatModal} data-test-id="chat-modal" />
    </>
  );
}

export default DriverNavbar;
