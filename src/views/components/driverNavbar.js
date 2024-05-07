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
          <Navbar.Brand href="#home">Easypark</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={handleOpenChatModal}>Message admin</Nav.Link>
              <Nav.Link href="#link">FAQ</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ChatModal receiverID={'a131a9a0-8d09-4166-b6fc-f8a08ba549e9'} show={showChatModal} handleClose={handleCloseChatModal} />
    </>
  );
}

export default DriverNavbar;
