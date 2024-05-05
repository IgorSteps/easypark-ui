import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import useCreateNotification from '../../controllers/useCreateNotification.js';

function NotificationForm({parkingRequestID, parkingSpaceID}) {
    const [notificationType, setNotificationType] = useState(null)
    const [location, setLocation] = useState('')
    
    const { create, notification, error } = useCreateNotification()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestBody = {parkingRequestID, parkingSpaceID, location, notificationType: parseInt(notificationType, 10)}
        await create(requestBody)
    };

    if (notification != null) {
        return (
            <>
                <Alert data-test-id="notification-success-alert" variant="success">
                {"Successfully created notification"}
                </Alert>

                <Notification notification={notification} />
            </>
        );
    }

    return (
        <Form onSubmit={handleSubmit} data-test-id="notification-form">
            <Form.Group controlId="formNotificationType" data-test-id="notification-type-group">
                <Form.Label data-test-id="notification-type-label">Select Notification Type</Form.Label>
                <Form.Control as="select" value={notificationType || ''} onChange={(e) => setNotificationType(e.target.value)} data-test-id="select-notification-type" required>
                    <option value="" disabled data-test-id="notification-type-option-placeholder">Choose...</option>
                    <option value="0" data-test-id="notification-type-option-arrival">Arrival</option>
                    <option value="1" data-test-id="notification-type-option-departure">Departure</option>
                </Form.Control>
            </Form.Group>
        
            <Form.Group controlId="formNotificationLocation" data-test-id="notification-location-group">
                <Form.Label data-test-id="notification-location-label">Enter your location</Form.Label>
                <Form.Control type="text" placeholder="cmp-1" value={location} onChange={(e) => setLocation(e.target.value)} data-test-id="notification-location-input" required/>
            </Form.Group>
            
            <Button variant="primary" type="submit" data-test-id="notification-submit-btn">
                Submit
            </Button>
        
            {error && (
                <Alert data-test-id="notification-error-alert" className='mt-4' variant="danger">
                    {"Failed to create notification: " + error}
                </Alert>
            )}
        </Form>
    );
}

export default NotificationForm;
