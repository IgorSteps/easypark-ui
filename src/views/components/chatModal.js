import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Chat from './chatForm.js';

function ChatModal({ receiverID, show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chat</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Chat receiverID={receiverID} data-test-id="chat" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} data-test-id="chat-modal-close-btn">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatModal;
