import React from 'react';
import { Card } from 'react-bootstrap';

function Notification({notification}) {
    const notificationTypes = {
        0: 'Arrival',
        1: 'Departure'
    };

    return (
        <Card>
            <Card.Header as="h5">Notification</Card.Header>
            <Card.Body>
                <Card.Text>ID: {notification.ID}</Card.Text>
                <Card.Text>Type: {notificationTypes[notification.Type]}</Card.Text>
                <Card.Text>Driver ID: {notification.DriverID}</Card.Text>
                <Card.Text>Parking Space ID: {notification.ParkingSpaceID}</Card.Text>
                <Card.Text>Location: {notification.Location}</Card.Text>
                <Card.Text>Timestamp: {notification.Timestamp}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Notification;