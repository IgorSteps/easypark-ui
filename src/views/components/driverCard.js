import React, {useState} from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import ChatModal from './chatModal.js';
import useBanUser from '../../controllers/useBanUser.js';

function Driver({ user, dataTestID }) {
    const [showChatModal, setShowChatModal] = useState(false);
    const handleSendMessage = () => {
        setShowChatModal(true);
    };
    const handleCloseChatModal = () => {
        setShowChatModal(false);
    };

    const { banUserResult, handleBanUser, banUserError } = useBanUser();

    const handleBanSubmit = async (event) => {
        event.preventDefault();
        await handleBanUser({id:user.ID, status:"ban"});
    };

    return (
        <>
            <Card data-test-id="driver-card" className='mb-3'>
                <Card.Body>
                    <Card.Title data-test-id={`${dataTestID}-name`}>{`${user.FirstName} ${user.LastName}`}</Card.Title>
                    <Card.Text data-test-id={`${dataTestID}-id`}>ID: {user.ID}</Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-email`}>Email: {user.Email}</Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-username`}>Username: {user.Username}</Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-status`}>Status: {user.Status}</Card.Text>
                    <Button data-test-id={`${dataTestID}-message-btn`} onClick={handleSendMessage}>Message</Button>
                    {" "}
                    <Button data-test-id={`${dataTestID}-ban-btn`} onClick={handleBanSubmit}>Ban</Button>
                    
                </Card.Body>
                {banUserError && (
                        <Alert className='mt-2' variant='danger' data-test-id={`${dataTestID}-ban-user-failure-alert`}  dismissible>
                            {"Failed to ban user: " + banUserError}
                        </Alert>
                    )}        
                {banUserResult && (
                        <Alert className='mt-2' variant='success' data-test-id={`${dataTestID}-ban-user-success-alert`}  dismissible>
                            {"Successfully banned user."}
                        </Alert>
                    )}        
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
