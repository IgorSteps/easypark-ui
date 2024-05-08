import React, {useState} from 'react';
import { Button, Card } from 'react-bootstrap';
import ChatModal from './chatModal.js';

function Driver({ user, dataTestID }) {
    const [showChatModal, setShowChatModal] = useState(false);
    const handleSendMessage = () => {
        setShowChatModal(true);
    };
    const handleCloseChatModal = () => {
        setShowChatModal(false);
    };

    return (
        <>
            <Card data-test-id="driver-card">
                <Card.Body>
                    <Card.Title data-test-id={`${dataTestID}-name`}>{`${user.FirstName} ${user.LastName}`}</Card.Title>
                    <Card.Text data-test-id={`${dataTestID}-id`}>ID: {user.ID}</Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-email`}>Email: {user.Email}</Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-username`}>Username: {user.Username}</Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-status`}>Status: {user.Status}</Card.Text>
                    <Button data-test-id={`${dataTestID}-message-btn`} onClick={handleSendMessage}>Message</Button>
                </Card.Body>
            </Card>

            <ChatModal
                receiverID={user.ID}
                show={showChatModal}
                handleClose={handleCloseChatModal}
                data-test-id="chat-modal"
            />
        </>
    );
};

export default Driver;
