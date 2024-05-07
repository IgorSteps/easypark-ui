import React, { useState, useCallback } from 'react';
import { Form, Button} from 'react-bootstrap';
import  useWebSocket from 'react-use-websocket';
import Message from './message.js';

function Chat({ receiverID }) {
    const userID = sessionStorage.getItem('userId');
    const url = `${process.env.WS_API_URL}/ws/${userID}`;
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('')

    const { sendMessage, lastMessage, readyState } = useWebSocket.default(url, {
        onOpen: () => console.log('Opened WebSocket connection on', url),
        onClose: () => console.log('Closed WebSocket connection on', url),
        onError: error => console.error('WebSocket error:', error),
        onMessage: (event) => {
            setMessages((prevMessages) => [...prevMessages, JSON.parse(event.data)]);
            console.debug("received message", event.data)
        },
    });

    const handleSendMessage = useCallback((event) => {
        event.preventDefault();
        // Check if the websocket connection is open and input is not empty.
        if (readyState === WebSocket.OPEN && messageContent.trim() !== '') {
            const message = { 
                senderID: userID,
                receiverID,
                content: messageContent
            };
            sendMessage(JSON.stringify(message));
            console.debug("sent message", event.data)
            setMessageContent(''); // Clear the form input.
        }
    }, [
        sendMessage,
        readyState,
        messageContent,
        receiverID // TODO: Check if this has to be a dependency - are we going to change it over the lifetime of this component?
    ]);

    return (
        <>
            <div className='chat-window'>
            {messages.map((message, index) => (
                    <div className='mb-2'>
                        <Message key={index} message={message} isCurrentUser={message.senderID === userID} />
                    </div>
                ))}
            </div>

            <Form onSubmit={handleSendMessage}>
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
