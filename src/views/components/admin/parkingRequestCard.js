import React, {useState, useEffect, useCallback} from 'react';
import { Card, Button, Alert, Row, Col } from 'react-bootstrap';
import { FormatDateTime } from '../../utils/time.js';
import useAutomaticallyAssignParkSpace from '../../../controllers/useAutomaticallyAssignParkSpace.js';
import useUpdateParkingRequestStatus from '../../../controllers/useUpdateParkingRequestStatus.js';
import useDeassignParkingSpace from '../../../controllers/useDeassignParkingSpace.js';

function ParkingRequest({fetch, parkingRequest, dataTestID}) {
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
                <Card.Header as="h5" data-test-id={`${dataTestID}-header`}>Parking Request</Card.Header>
                <Card.Body>
                    <Card.Text data-test-id={`${dataTestID}-id`}>
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
                    <Card.Text data-test-id={`${dataTestID}-end-time`}>
                        <strong>End Time:</strong> {FormatDateTime(parkingRequest.EndTime)}
                    </Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-status`}>
                        <strong>Status:</strong> {parkingRequest.Status}
                    </Card.Text>

                    <Row md='auto' className='mb-2'>
                        {parkingRequest.Status !== 'approved' && parkingRequest.Status !== 'rejected' &&
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
                        { parkingRequest.Status == 'approved' && parkingRequest.Status != 'pending' &&
                            <Col>
                                <Button variant='danger' onClick={handleDeassign} data-test-id={`${dataTestID}-deassign-btn`}>
                                    De-assign parking space
                                </Button>
                            </Col>
                        }
                    </Row>
                    
                    {assignError && (
                        <Alert variant='danger'>
                        {assignError}
                        </Alert>
                    )}

                    {updateStatusError && (
                        <Alert variant='danger'>
                            {updateStatusError}
                        </Alert>
                    )}

                    {deassignError && (
                        <Alert variant='danger'>
                            {deassignError}
                        </Alert>
                    )}
                    {space && (
                        <Alert variant='success'>
                            {"Successfully approved request and assigned a space. "}
                        </Alert>
                    )}
                    {statusUpdateResponse && (
                        <Alert variant='success'>
                            {"Successfully updated a parking space status"}
                        </Alert>
                    )}
                    {deassignMsg && (
                        <Alert variant='success'>
                            {"Successfully de-assigned parking space"}
                        </Alert>
                    )}                
                </Card.Body>
            </Card>
        </>
    )
}

export default ParkingRequest;