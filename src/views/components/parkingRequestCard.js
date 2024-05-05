import React, {useState} from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import NotificationForm from './notificationForm.js';
import { FormatDateTime } from '../utils/time.js';

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

    return (
        <>
            <Card className="mb-3" data-test-id="parking-request-card"> 
                <Card.Header as="h5" data-test-id="parking-request-header">Parking Request</Card.Header>
                <Card.Body>
                    <Card.Text data-test-id="parking-request-id">
                        <strong>ID:</strong> {parkingRequest.ID}
                    </Card.Text>
                    <Card.Text data-test-id="parking-request-lot-name">
                        <strong>Parking Lot Name:</strong> {parkingRequest.DestinationParkingLotName}
                    </Card.Text>
                    <Card.Text data-test-id="parking-request-space-id">
                        <strong>Assigned Parking Space ID:</strong> {parkingRequest.ParkingSpaceID}
                    </Card.Text>
                    <Card.Text data-test-id="parking-request-start-time">
                        <strong>Start Time:</strong> {FormatDateTime(parkingRequest.StartTime)}
                    </Card.Text>
                    <Card.Text data-test-id="parking-request-end-time">
                        <strong>End Time:</strong> {FormatDateTime(parkingRequest.EndTime)}
                    </Card.Text>
                    <Card.Text data-test-id="parking-request-status">
                        <strong>Status:</strong> {parkingRequest.Status}
                    </Card.Text>

                    {/* Render Notify button conditionally based on ParkingSpaceID presence */}
                    {parkingRequest.ParkingSpaceID && 
                        <Button variant="primary" onClick={() => handleShowNotificationModal(parkingRequest)} data-test-id="notify-arrival-departure-btn">
                            Notify arrival or departure
                        </Button>
                    }
                </Card.Body>
            </Card>

            <Modal show={showNotificationModal} onHide={handleCloseNotificationModal} data-test-id="notification-modal">
                <Modal.Header closeButton data-test-id="modal-header">
                    <Modal.Title data-test-id="modal-title">Notify of arrival or departure</Modal.Title>
                </Modal.Header>
                <Modal.Body data-test-id="modal-body">
                    {activeRequest && <NotificationForm parkingRequestID={activeRequest.ID} parkingSpaceID={activeRequest.ParkingSpaceID} />}
                </Modal.Body>
                <Modal.Footer data-test-id="modal-footer">
                    <Button variant="secondary" onClick={handleCloseNotificationModal} data-test-id="close-modal-btn">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ParkingRequest;