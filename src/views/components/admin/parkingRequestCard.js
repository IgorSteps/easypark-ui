import React, {useState, useCallback} from 'react';
import { Card, Button, Alert, Row, Col, Collapse } from 'react-bootstrap';
import { FormatDateTime } from '../../utils/time.js';
import useAutomaticallyAssignParkSpace from '../../../controllers/useAutomaticallyAssignParkSpace.js';
import useUpdateParkingRequestStatus from '../../../controllers/useUpdateParkingRequestStatus.js';
import useDeassignParkingSpace from '../../../controllers/useDeassignParkingSpace.js';

function ParkingRequest({fetch, parkingRequest, dataTestID}) {
    const [open, setOpen] = useState(false);
    const { automaticallyAssign, space, assignError } = useAutomaticallyAssignParkSpace();
    const { updateStatus, responseMsg: statusUpdateResponse, updateStatusError } = useUpdateParkingRequestStatus();
    const { deassign, deassignMsg, deassignError } = useDeassignParkingSpace()

    const handleApprove = useCallback(async () => {
        await automaticallyAssign({ parkingRequestID: parkingRequest.ID });
        fetch();
    }, [parkingRequest.ID, fetch]);

    const handleReject = useCallback(async () => {
        await updateStatus(parkingRequest.ID, { status: "rejected" });
        fetch();
    }, [parkingRequest.ID, fetch]);

    const handleDeassign = useCallback(async () => {
        await deassign(parkingRequest.ID);
        fetch();
    }, [parkingRequest.ID, fetch]);

    return (
        <>
            <Card className="mb-3" data-test-id={`${dataTestID}-card`}> 
                <Card.Header as="h5" data-test-id={`${dataTestID}-header`}>
                    <Row className="align-items-center justify-content-between">
                        <Col xs="auto">
                            Parking Request
                        </Col>
                        <Col xs="auto">
                            <Button
                                onClick={() => setOpen(!open)}
                                aria-controls="collapse-part"
                                aria-expanded={open}
                                variant="link"
                            >
                                {open ? 'Hide Details' : 'Show Details'}
                            </Button>
                        </Col>
                    </Row>

                </Card.Header>
                <Card.Body>
                    <Card.Text className='mb-0' data-test-id={`${dataTestID}-status`}>
                        <strong>Status:</strong> {parkingRequest.Status}
                    </Card.Text>
                    <Collapse in={open}>
                        <div id="collapse-part">
                            <Card.Text className='mt-3' data-test-id={`${dataTestID}-id`}>
                                <strong>ID:</strong> {parkingRequest.ID}
                            </Card.Text>
                            <Card.Text data-test-id={`${dataTestID}-lot-name`}>
                                <strong>Parking Lot Name:</strong> {parkingRequest.DestinationParkingLotName}
                            </Card.Text>
                            {/* Only show parking space details if it has been assigned and fetched. */}
                            {parkingRequest.ParkingSpaceID && space && 
                                <Card.Text data-test-id={`${dataTestID}-space-name`}>
                                    <strong>Assigned Parking Space:</strong> {space.Name}
                                </Card.Text>
                            }
                            <Card.Text data-test-id={`${dataTestID}-start-time`}>
                                <strong>Start Time:</strong> {FormatDateTime(parkingRequest.StartTime)}
                            </Card.Text>
                            <Card.Text className='mb-2' data-test-id={`${dataTestID}-end-time`}>
                                <strong>End Time:</strong> {FormatDateTime(parkingRequest.EndTime)}
                            </Card.Text>
                        </div>
                    </Collapse>
                   
                        {parkingRequest.Status !== 'approved' && parkingRequest.Status !== 'rejected' &&
                            <Row md='auto'>
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
                            </Row>
                        }
                        { parkingRequest.Status == 'approved' && parkingRequest.Status != 'pending' &&
                            <Button variant='danger' onClick={handleDeassign} data-test-id={`${dataTestID}-deassign-btn`}>
                                De-assign parking space
                            </Button>
                        }
                    
                    {assignError && (
                        <Alert variant='danger' dismissible>
                        {assignError}
                        </Alert>
                    )}

                    {updateStatusError && (
                        <Alert variant='danger' dismissible>
                            {updateStatusError}
                        </Alert>
                    )}

                    {deassignError && (
                        <Alert variant='danger' dismissible>
                            {deassignError}
                        </Alert>
                    )}
                    {space && (
                        <Alert className='mt-2' variant='success' dismissible>
                            {"Successfully approved request and assigned a space. "}
                        </Alert>
                    )}
                    {statusUpdateResponse && (
                        <Alert className='mt-2' variant='success' dismissible>
                            {"Successfully updated a parking space status"}
                        </Alert>
                    )}
                    {deassignMsg && (
                        <Alert className='mt-2' variant='success' dismissible>
                            {"Successfully de-assigned parking space"}
                        </Alert>
                    )}                
                </Card.Body>
            </Card>
        </>
    )
}

export default ParkingRequest;