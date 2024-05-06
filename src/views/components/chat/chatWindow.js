import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MessageList from './messageList.js';
import MessageInput from './messageInput.js';

function ChatWindow({ messages, onSendMessage }) {
  return (
    <Container>
      <Row>
        <Col>
          <MessageList messages={messages} />
        </Col>
      </Row>
      <Row>
        <Col>
          <MessageInput onSendMessage={onSendMessage} />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatWindow;
