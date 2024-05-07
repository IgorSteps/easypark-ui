import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useWebSocket } from '../../context/websocketContext.js';

function Chat({ receiverID }) {
    const { sendMessage, messages } = useWebSocket();
    const [messageContent, setMessageContent] = useState('');

    const handleMessageSend = (e) => {
        e.preventDefault();
        
        // Trim leading/trailing whitespace
        // and check we are not sending empty strings.
        if (messageContent.trim() !== '') {
            sendMessage(receiverID, messageContent);
            setMessageContent('');
        }
    };

    return (
        <>
            <div>
                {messages && messages.map((message, index) => (
                    <div key={index}>
                        <Row>
                            <Col>
                                {/* Align your messages to the right. */}
                                { message.senderID === sessionStorage.getItem('userId') ? (
                                    <p style={{ textAlign: 'right' }}>You: {message.content}</p>
                                ) : (
                                    <p>Recipient: {message.content}</p>
                                )}
                            </Col>
                        </Row>
                    </div>
                ))}
            </div>

            <Form onSubmit={handleMessageSend}>
                <Form.Group controlId="messageContent">
                    <Form.Control
                        type="text"
                        placeholder="Type your message..."
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                    />
                </Form.Group>
                <Button className='mt-2' variant="primary" type="submit">
                Send
                </Button>
            </Form>
        </>
    );
};

export default Chat;
