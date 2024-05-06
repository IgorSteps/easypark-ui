import React, {useState, useEffect} from 'react';
import { Card, Button, Modal, Row, Col, Alert } from 'react-bootstrap';
import { FormatDateTime } from '../utils/time.js';
import useGetParkingSpace from '../../controllers/useGetParkingSpace.js';
import ParkingLotMapImage from '../../assets/ParkingLotImage.png'
import ImageModal from './imageModal.js';
import NotificationModal from './notificationModal.js';

function ParkingRequest({parkingRequest, dataTestID}) {
    const [activeRequest, setActiveRequest] = useState(null);
    const [parkingSpaceDetails, setParkingSpaceDetails] = useState(null);
    const [parkingSpaceFetched, setParkingSpaceFetched] = useState(false);
   
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const handleShowNotificationModal = (request) => {
        setActiveRequest(request);
        setShowNotificationModal(true);
    };
    const handleCloseNotificationModal = () => {
        setShowNotificationModal(false);
        setActiveRequest(null);
    };
    
    const [showMapModal, setShowMapModal] = useState(false);
    const handleShowMapModal = () => setShowMapModal(true);
    const handleCloseMapModal = () => setShowMapModal(false);

    // Fetch assigned parking space data once it is assigned.
    const { parkingSpace, fetchSingleParkingSpace, getSingleParkingSpaceError } = useGetParkingSpace();
    useEffect(() => {
        if (parkingRequest.ParkingSpaceID  && !parkingSpaceFetched) {
            fetchSingleParkingSpace(parkingRequest.ParkingSpaceID);
            setParkingSpaceFetched(true);
        }
    }, [parkingRequest.ParkingSpaceID, fetchSingleParkingSpace, parkingSpaceFetched]);
    // Set its details once it is fetched.
    useEffect(() => {
        if (parkingSpace) {
            setParkingSpaceDetails(parkingSpace);
        }
    }, [parkingSpace]);

    return (
        <>
            <Card className="mb-3" data-test-id={`${dataTestID}-card`}> 
                <Card.Header as="h5" data-test-id={`${dataTestID}-header`}>Parking Request</Card.Header>
                <Card.Body>
                    <Card.Text data-test-id={`${dataTestID}-id`}>
                        <strong>ID:</strong> {parkingRequest.ID}
                    </Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-lot-name`}>
                        <strong>Parking Lot Name:</strong> {parkingRequest.DestinationParkingLotName}
                    </Card.Text>
                    {/* Only show parking space details if it has been assigned and fetched. */}
                    {parkingRequest.ParkingSpaceID && parkingSpaceDetails && 
                        <Card.Text data-test-id={`${dataTestID}-space-name`}>
                            <strong>Assigned Parking Space:</strong> {parkingSpaceDetails.Name}
                        </Card.Text>
                    }
                    <Card.Text data-test-id={`${dataTestID}-start-time`}>
                        <strong>Start Time:</strong> {FormatDateTime(parkingRequest.StartTime)}
                    </Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-end-time`}>
                        <strong>End Time:</strong> {FormatDateTime(parkingRequest.EndTime)}
                    </Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-status`}>
                        <strong>Status:</strong> {parkingRequest.Status}
                    </Card.Text>

                    { getSingleParkingSpaceError && (
                        <Alert variant='danger'>
                            Failed to fetch assigned parking space details.
                        </Alert>
                    )}

                    <Row>
                        <Col md='auto'>
                            {/* Only show map button if the parking request has been approved. */}
                            {parkingRequest.Status === 'approved' && 
                                <Button 
                                variant="primary" 
                                onClick={handleShowMapModal}
                                data-test-id={`${dataTestID}-map-btn`}>
                                View Map
                                </Button>
                            }
                        </Col>
                        
                        <Col md='auto'>
                            {/* Only show notify button if parking request has been approved or active for departure notifications. */}
                            {(parkingRequest.Status === 'approved' || parkingRequest.Status === 'active')  && 
                                <Button 
                                    variant="secondary" 
                                    onClick={() => handleShowNotificationModal(parkingRequest)} 
                                    data-test-id={`${dataTestID}-notify-btn`}>
                                    Notify arrival or departure
                                </Button>
                            }
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <ImageModal show={showMapModal} onClose={handleCloseMapModal} image={ParkingLotMapImage} />
            
            {activeRequest && (
                <NotificationModal show={showNotificationModal} onClose={handleCloseNotificationModal} parkingRequest={activeRequest}/>
            )}
        </>
    )
}

export default ParkingRequest;