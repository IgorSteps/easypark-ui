import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    onSendMessage(message);
    setMessage('');
  };

  return (
    <Form>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSendMessage}>
        Send
      </Button>
    </Form>
  );
};

export default MessageInput;
