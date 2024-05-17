import React, { useState } from 'react';
import { Row, Col, Container, Card, Tooltip, OverlayTrigger , Button } from 'react-bootstrap';

function GraphicalParkingLot({ ParkingSpaces }) {
    
    // Colours for different statuses.
    const colorMap = {
        blocked: 'danger',
        reserved: 'info',
        occupied: 'secondary',
        available: 'success'
    };

    const showSpaceTooltip = (space, status) => (
        <Tooltip id={`tooltip-${space.ID}`}>
            <strong>{space.Name}</strong>
            <br />
            Status: {status}
        </Tooltip>
    )

    const showColourMapTooltip = (props) => (
        <Tooltip  {...props}>
            {Object.keys(colorMap).map((status, index) => {
                    return (
                        <Card key={index} className='mb-2' bg={colorMap[status].toLowerCase()} >
                            <Card.Text>{status}</Card.Text>
                        </Card>
                    )
                })}
        </Tooltip>
    )
    console.info(ParkingSpaces)
    return (
        <Container>
            
            <OverlayTrigger
                placement="right"
                overlay={showColourMapTooltip}
            >
                <Button variant="primary">Hover to see what colours mean</Button>
            </OverlayTrigger>

            
            <Row xs={10} className='mt-2'>

                {ParkingSpaces.map(space => {
                    const status = space.Status;
                    return (
                        <Col key={space.ID}>
                            <OverlayTrigger placement="top" overlay= {showSpaceTooltip(space, status)} >
                                <Card bg={colorMap[status]} style={{ height: '30px', width: '30px', cursor: 'pointer' }} />
                            </OverlayTrigger>
                        </Col>
                    );
                })}

            </Row>
        </Container>
    );
};

export default GraphicalParkingLot;
