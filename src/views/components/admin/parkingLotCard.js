import React, {useState, useCallback} from 'react';
import { Card, Button, Alert, Row, Col, Collapse } from 'react-bootstrap';
import { FormatDateTime } from '../../utils/time.js';

function ParkingLot({parkingLot, dataTestID}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Card className="mb-3" data-test-id={`${dataTestID}-card`}> 
                <Card.Header as="h5" data-test-id={`${dataTestID}-header`}>{parkingLot.Name}</Card.Header>
                <Card.Body>
                    <Card.Text data-test-id={`${dataTestID}-lot-name`}>
                        <strong>Capacity:</strong> {parkingLot.Capacity}
                    </Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-start-time`}>
                        <strong>Parking Spaces:</strong> {FormatDateTime(parkingLot.PakringSpaces)}
                    </Card.Text>
                    <Row>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}

export default ParkingLot;