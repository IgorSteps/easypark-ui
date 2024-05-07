import React, { useState, useCallback } from 'react';
import { Form, Button} from 'react-bootstrap';
import  useWebSocket,  { ReadyState }  from 'react-use-websocket';
import Message from './message.js';

function Chat({ receiverID }) {
    const userID = sessionStorage.getItem('userId');
    const url = `${process.env.WS_API_URL}/ws/${userID}`;
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('')

    const { sendMessage, lastMessage, readyState } = useWebSocket.default(url, {
        onOpen: () => console.log('WebSocket connection opened on', url),
        onClose: () => console.log('WebSocket connection closed on', url),
        onError: error => console.error('WebSocket error:', error),
        onMessage: (event) => {
            console.log("received message", event.data)
            setMessages((prevMessages) => [...prevMessages, JSON.parse(event.data)]);
        },
    });

    const handleSendMessage = useCallback((event) => {
        event.preventDefault();
        if (readyState === WebSocket.OPEN && messageContent.trim() !== '') {
            const message = { 
                senderID: userID,
                receiverID,
                content: messageContent
            };
            console.log("send message", event.data)
            sendMessage(JSON.stringify(message));
            setMessageContent(''); // Clear the input after sending
        }
    }, [sendMessage, readyState, userID, messageContent, receiverID]);

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
