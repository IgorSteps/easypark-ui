import React, { useState } from 'react';
import { Row, Col, Container, Card, Tooltip, OverlayTrigger  } from 'react-bootstrap';

function GraphicalParkingLot({ ParkingSpaces }) {
    // TODO: Move to models
    const getStatus = (parkingSpace) => {
        const currentTime = new Date(); // Now

        // Check if the space is reserved or blocked and should remain so regardless of time
        if (parkingSpace.Status === 'blocked' || parkingSpace.Status === 'reserved') {
            return parkingSpace.Status;
        }
        if (parkingSpace.ParkingRequests === null ){
            return 'available';
        }
        // Check if there is any active parking request during the current time
        for (let request of parkingSpace.ParkingRequests) {
            const requestStart = new Date(request.StartTime);
            const requestEnd = new Date(request.EndTime);
            if (requestStart <= currentTime && currentTime <= requestEnd) {
                return 'occupied'; // The space is currently occupied
            }
        }

        // If none of the above, the space is available
        return 'available';
    };

    // Colours for different statuses.
    const colorMap = {
        blocked: 'danger',
        reserved: 'info',
        occupied: 'secondary',
        available: 'success'
    };

    // // Determine the number of columns and card size based on the number of spaces
    // // TODO: Play with these settings
    // const calculateLayout = (count) => {
    //     if (count <= 50) {
    //       return { cols: 5, size: '100px'};
    //     } else if (count <= 100) {
    //       return { cols: 10, size: '80px' };
    //     } else if (count <= 300) {
    //       return { cols: 15, size: '60px' };
    //     } else if (count <= 500) {
    //       return { cols: 20, size: '50px' };
    //     } else {
    //       return { cols: 25, size: '40px' };
    //     }
    // };
    // const layout = calculateLayout(ParkingSpaces.length)
    const showTooltip = (space, status) => (
        <Tooltip id={`tooltip-${space.ID}`}>
            <strong>{space.Name}</strong>
            <br />
            Status: {status}
        </Tooltip>
    )
    
    return (
        <Container >
            <Row xs={10}>

                {ParkingSpaces.map(space => {
                    const status = getStatus(space);
                    return (
                        <Col key={space.ID}>
                            <OverlayTrigger placement="top" overlay= {showTooltip(space, status)} >
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
