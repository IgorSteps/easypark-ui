import React, {useState} from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import ChatModal from './chatModal.js';

function Driver({ user }) {
    const [showChatModal, setShowChatModal] = useState(false);
    
    const handleSendMessage = () => {
        setShowChatModal(true);
    };

    const handleCloseChatModal = () => {
        setShowChatModal(false);
    };

    return (
        <>
        <Card>
            <Card.Body>
                <Card.Title>{`${user.FirstName} ${user.LastName}`}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{user.ID}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{user.Email}</Card.Subtitle>
                
                <ListGroup variant="flush">
                    <ListGroup.Item>Username: {user.Username}</ListGroup.Item>
                    <ListGroup.Item>Status: {user.Status}</ListGroup.Item>
                </ListGroup>

                <Button onClick={handleSendMessage}>Message</Button>
            </Card.Body>
        </Card>
        <ChatModal
            receiverID={user.ID}
            show={showChatModal}
            handleClose={handleCloseChatModal}
        />
        </>
    );
};

export default Driver;
