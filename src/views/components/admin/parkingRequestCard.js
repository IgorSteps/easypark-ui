import React, {useState, useEffect} from 'react';
import { Card, Button, Alert, Row, Col } from 'react-bootstrap';
import { FormatDateTime } from '../../utils/time.js';
import useAutomaticallyAssignParkSpace from '../../../controllers/useAutomaticallyAssignParkSpace.js';
import useUpdateParkingRequestStatus from '../../../controllers/useUpdateParkingRequestStatus.js';

function ParkingRequest({parkingRequest, dataTestID}) {
    const [parkingSpaceDetails, setParkingSpaceDetails] = useState(null);
    const { automaticallyAssign, space, error } = useAutomaticallyAssignParkSpace();

    // Local status to manage UI state independently
    const [localStatus, setLocalStatus] = useState(parkingRequest.Status);

    const handleApprove = async (event) => {
        event.preventDefault();
        const req = {
            parkingRequestID: parkingRequest.ID
        };
        await automaticallyAssign(req);
        setLocalStatus('approved');
    };

    const { updateStatus, responseMsg, updateStatusError } = useUpdateParkingRequestStatus();

    const handleReject = async (event) => {
        event.preventDefault();
        const req = {
            status: "rejected"
        };
        await updateStatus(parkingRequest.ID, req);
        setLocalStatus('rejected');
    };

    useEffect(() => {
        if (space) {
            setParkingSpaceDetails(space);
        }
    }, [space]);

    // Sync local status with parkingRequest when it updates.
    useEffect(() => {
        setLocalStatus(parkingRequest.Status); 
    }, [parkingRequest.Status]);

    
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

                    { error && (
                        <Alert variant='danger'>
                           { "Failed to assign a parking space: " + error}
                        </Alert>
                    )}

                    { updateStatusError && (
                        <Alert variant='danger'>
                            {"Failed to update parking request status: " + updateStatusError}
                        </Alert>
                    )}

                    {space && (
                        <Alert variant='info' data-test-id={`${dataTestID}-approval-success-alert`}>
                            Successfully assigned a space.
                        </Alert>
                    )}

                    { responseMsg && (
                        <Alert variant='info' data-test-id={`${dataTestID}-rejection-success-alert`}>
                            Successfully changed parking request status.
                        </Alert>
                    )}

                    
                    <Row md='auto'>
                        {localStatus !== 'approved' && localStatus !== 'rejected' &&
                            <>
                                <Col>
                                    <Button variant="success" onClick={handleApprove} data-test-id={`${dataTestID}-approve-btn`}>
                                        Approve
                                    </Button>
                                </Col>
                                <Col>
                                    <Button variant="danger" onClick={handleReject} data-test-id={`${dataTestID}-reject-btn`}>
                                       Reject
                                    </Button>
                                </Col>
                            </>
                        }
                    </Row>
                    
                
                </Card.Body>
            </Card>
        </>
    )
}

export default ParkingRequest;