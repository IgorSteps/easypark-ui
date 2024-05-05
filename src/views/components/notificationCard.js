import React from 'react';
import { Card } from 'react-bootstrap';
import { FormatDateTime } from '../utils/time';
function Notification({notification}) {
    const notificationTypes = {
        0: 'Arrival',
        1: 'Departure'
    };

    return (
        <Card>
            <Card.Header as="h5">Notification</Card.Header>
            <Card.Body>
                <Card.Text data-test-id="notification-id">ID: {notification.ID}</Card.Text>
                <Card.Text data-test-id="notification-type">Type: {notificationTypes[notification.Type]}</Card.Text>
                <Card.Text data-test-id="notification-location">Location: {notification.Location}</Card.Text>
                <Card.Text data-test-id="notification-timestamp">Timestamp: {FormatDateTime(notification.Timestamp)}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Notification;