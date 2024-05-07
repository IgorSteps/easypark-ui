import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Chat from './chat.js';

function ChatModal({ receiverID, show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chat</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Chat receiverID={receiverID} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatModal;
