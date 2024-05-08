import React, { useState } from 'react';
import { Row, Col, Container, Card, Tooltip, OverlayTrigger  } from 'react-bootstrap';
function ParkingLot({ parkingLotData, selectedTime }) {
    // TODO: fetch updates on parking spaces dynamically.

    // Function to determine the status of a parking space at the selected time
    const getStatusForTimeRange = (parkingSpace, selectedTime) => {
        const { startTime, endTime } = selectedTime;
        const selectedStart = new Date(startTime);
        const selectedEnd = new Date(endTime);
    
        // Check if the space is reserved or blocked and should remain so regardless of time
        if (parkingSpace.Status === 'blocked' || parkingSpace.Status === 'reserved') {
          return parkingSpace.Status;
        }
    
        // Check if there is any active parking request during the selected time range
        for (let request of parkingSpace.ParkingRequests) {
            const requestStart = new Date(request.StartTime);
            const requestEnd = new Date(request.EndTime);
            if (intervalsOverlap(selectedStart, selectedEnd, requestStart, requestEnd)) {
                return 'occupied';
            }
        }
    
        // If none of the above, the space is available
        return 'available';
    };

    // Define colors for different statuses
    const colorMap = {
        blocked: 'danger',
        reserved: 'info',
        occupied: 'secondary',
        available: 'success'
    };

    // Determine the number of columns and card size based on the number of spaces
    const calculateLayout = (count) => {
        if (count <= 50) {
          return { cols: 5, size: '100px'};
        } else if (count <= 100) {
          return { cols: 10, size: '80px' };
        } else if (count <= 300) {
          return { cols: 15, size: '60px' };
        } else if (count <= 500) {
          return { cols: 20, size: '50px' };
        } else {
          return { cols: 25, size: '40px' };
        }
    };
    const layout = calculateLayout(parkingLotData.ParkingSpaces.length)

    // Render parking spaces
    return (
        <Container fluid>
            <Row xs={layout.cols}>
                {parkingLotData.ParkingSpaces.map(space => {
                const status = getStatusForTimeRange(space, selectedTime);
                return (
                    <Col key={space.ID} className="mb-3">
                        <OverlayTrigger
                            placement="top"
                            overlay={
                            <Tooltip id={`tooltip-${space.ID}`}>
                                <strong>{space.Name}</strong><br />
                                Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                            </Tooltip>
                            }
                        >
                            <Card bg={colorMap[status]} style={{ height: '30px', width: '30px', cursor: 'pointer' }}>
                                <Card.Body className="p-2" />
                            </Card>
                        </OverlayTrigger>
                    </Col>
                );
                })}
            </Row>
        </Container>
    );
};

export default ParkingLot;
