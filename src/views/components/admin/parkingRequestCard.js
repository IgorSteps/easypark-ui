import React, {useState, useEffect} from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { FormatDateTime } from '../../utils/time.js';
import useAutomaticallyAssignParkSpace from '../../../controllers/useAutomaticallyAssignParkSpace.js';

function ParkingRequest({parkingRequest, dataTestID}) {
    const [parkingSpaceDetails, setParkingSpaceDetails] = useState(null);
   
    const {automaticallyAssign, space, error} = useAutomaticallyAssignParkSpace()

    const handleApprove = async (event) => {
        event.preventDefault();
        const req = {
            parkingRequestID: parkingRequest.ID
        }
        console.info(req)
        await automaticallyAssign(req);
    };
    
    useEffect(() => {
        if (space) {
            setParkingSpaceDetails(space);
        }
    }, [space]);

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
                            Failed to assign a parking space.
                        </Alert>
                    )}

                    {space && 
                        <Button variant="primary" onClick={handleApprove}>Approve</Button>
                    }  
                
                </Card.Body>
            </Card>
        </>
    )
}

export default ParkingRequest;