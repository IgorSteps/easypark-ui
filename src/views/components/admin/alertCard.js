import React, {useState} from 'react';
import { Card, Button, Alert, Row, Col } from 'react-bootstrap';
import ChatModal from './../chatModal.js';

function OurAlert({alert, dataTestID}) {

    const alertTypes = {
        0: 'Location Mismatch',
        1: 'Late Arrival'
    }

    const [showChatModal, setShowChatModal] = useState(false);
    const handleSendMessage = () => {
        setShowChatModal(true);
    };
    const handleCloseChatModal = () => {
        setShowChatModal(false);
    };

    return (
        
        <>
            <Card className="mb-3" data-test-id={`${dataTestID}-card`}> 
                <Card.Header as="h5" data-test-id={`${dataTestID}-header`}>Alert</Card.Header>
                <Card.Body>
                    <Card.Text data-test-id={`${dataTestID}-id`}>
                        <strong>ID:</strong> {alert.ID}
                    </Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-type`}>
                        <strong>Type:</strong> {alertTypes[alert.Type]}
                    </Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-message`}>
                        <strong>Message:</strong> {alert.Message}
                    </Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-user-id`}>
                        <strong>User ID:</strong> {alert.UserID}
                    </Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-space-id`}>
                        <strong>Parking Space ID:</strong> {alert.ParkingSpaceID}
                    </Card.Text>
                    <Button data-test-id={`${dataTestID}-message-btn`} onClick={handleSendMessage}>Message</Button>
                </Card.Body>
            </Card>

            <ChatModal
                receiverID={alert.UserID}
                show={showChatModal}
                handleClose={handleCloseChatModal}
                data-test-id="chat-modal"
            />
        </>
    )
}

export default OurAlert;