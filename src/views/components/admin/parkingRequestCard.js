import React, {useState, useEffect} from 'react';
import { Card, Button, Modal, Alert } from 'react-bootstrap';
import { FormatDateTime } from '../../utils/time.js';
import useGetParkingSpace from '../../../controllers/useGetParkingSpace.js';
import ParkingLotModal from './parkingLotModal.js';

function ParkingRequest({parkingRequest, dataTestID}) {
    const [parkingSpaceDetails, setParkingSpaceDetails] = useState(null);
    const [parkingSpaceFetched, setParkingSpaceFetched] = useState(false);
   
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

    // Modal to assign park space
    const [showModal, setShowModal] = useState(false);
    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

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

                    <Button variant="primary" onClick={handleModalShow}>Approve</Button>
                
                </Card.Body>
            </Card>


            <ParkingLotModal 
                show={showModal}
                onClose={handleModalClose} 
                parkingLotID={parkingRequest.DestinationParkingLotID}
                startTime={parkingRequest.startTime}
                endTime={parkingRequest.endTime} />
           
        </>
    )
}

export default ParkingRequest;