import React, {useState} from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import NotificationForm from './notificationForm.js';

function ParkingRequest({parkingRequest}) {
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [activeRequest, setActiveRequest] = useState(null);

    const handleShowNotificationModal = (request) => {
        setActiveRequest(request);
        setShowNotificationModal(true);
    };

    const handleCloseNotificationModal = () => {
        setShowNotificationModal(false);
        setActiveRequest(null);
    };

     // Function to format date time objects to human-readable format.
     const formatDateTime = (datetimeString) => {
        const date = new Date(datetimeString);
        return date.toLocaleString();
    };

    return (
        <>
        <Card className="mb-3"> 
            <Card.Header as="h5">Parking Request</Card.Header>
            <Card.Body>
                <Card.Text>
                    <strong>ID:</strong> {parkingRequest.ID}
                </Card.Text>
                <Card.Text>
                    <strong>Parking Lot Name:</strong> {parkingRequest.DestinationParkingLotName}
                </Card.Text>
                <Card.Text>
                    <strong>Assigned Parking Space ID:</strong> {parkingRequest.ParkingSpaceID}
                </Card.Text>
                <Card.Text>
                    <strong>Start Time:</strong> {formatDateTime(parkingRequest.StartTime)}
                </Card.Text>
                <Card.Text>
                    <strong>End Time:</strong> {formatDateTime(parkingRequest.EndTime)}
                </Card.Text>
                <Card.Text>
                    <strong>Status:</strong> {parkingRequest.Status}
                </Card.Text>

                {/* {Only render notify button when there is a parking space id} */}
                {parkingRequest.ParkingSpaceID && 
                    <Button variant="primary" onClick={() => handleShowNotificationModal(parkingRequest)}>
                        Notify arrival or departure
                    </Button>
                }
            </Card.Body>
        </Card>

        <Modal show={showNotificationModal} onHide={handleCloseNotificationModal}>
            <Modal.Header closeButton>
                <Modal.Title>Notify of arrival or departure</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {activeRequest && <NotificationForm parkingRequestID={activeRequest.ID} parkingSpaceID={activeRequest.ParkingSpaceID} />}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseNotificationModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

        </>
    )
}

export default ParkingRequest;