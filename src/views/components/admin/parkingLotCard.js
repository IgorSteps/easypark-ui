import React, {useState, useCallback} from 'react';
import { Card, Button, Alert, Row, Col, Collapse } from 'react-bootstrap';
import useDeleteParkingLot from '../../../controllers/useDeleteParkingLot.js';
import GraphicalParkingLotModal from './graphicalParkingLotModal.js';
import ManageParkingSpaceModal from './ManageParkingSpaceModal.js';

function ParkingLot({parkingLot, fetch, dataTestID}) {

    const { deleteParkLotResponse, handleParkingLotDeletion, error } = useDeleteParkingLot();
    const handleDelete = async (event) => {
        event.preventDefault();
        await handleParkingLotDeletion(parkingLot.ID);
        fetch();
    };

    const [showGraphic, setShowGraphic] = useState(false)
    const handleShowGraphicModal = () => setShowGraphic(true);
    const handleCloseGraphicModal = () => setShowGraphic(false);

    const [showManage, setShowManage] = useState(false)
    const handleCloseManageModal = () => setShowManage(false);
    const handleShowManageModal = () => setShowManage(true);


    return (
        <>
            <Card className="mb-3" data-test-id={`${dataTestID}-card`}> 
                <Card.Header as="h5" data-test-id={`${dataTestID}-header`}>{parkingLot.Name}</Card.Header>

                <Card.Body>
                    <Card.Text data-test-id={`${dataTestID}-lot-name`}>
                        <strong>Capacity:</strong> {parkingLot.Capacity}
                    </Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-available`}>
                        <strong>Available:</strong> {parkingLot.Available}
                    </Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-occupied`}>
                        <strong>Occupied:</strong> {parkingLot.Occupied}
                    </Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-occupied`}>
                        <strong>Reserved:</strong> {parkingLot.Reserved}
                    </Card.Text>
                    <Card.Text data-test-id={`${dataTestID}-occupied`}>
                        <strong>Blocked:</strong> {parkingLot.Blocked}
                    </Card.Text>
                   
                
                    <Button className='me-2' variant="danger" onClick={handleDelete} data-test-id={`${dataTestID}-delete-btn`}>
                        Remove
                    </Button>

                    <Button className='me-2' onClick={handleShowGraphicModal} data-test-id={`${dataTestID}-show-details-btn`}>
                        Show Parking Spaces
                    </Button>

                    <Button variant='primary' onClick={handleShowManageModal} data-test-id={`${dataTestID}-show-details-btn`}>
                        Manage Parking Spaces
                    </Button>

                    {error && (
                        <Alert className='mt-2' variant='danger' data-test-id={`${dataTestID}-delete-error-alert`}  dismissible>
                            {"Failed to delete parking lot: " + error}
                        </Alert>
                    )}

                    {deleteParkLotResponse && (
                        <Alert className='mt-2' variant='success' data-test-id={`${dataTestID}-delete-success-alert`}  dismissible>
                        {"Successfully deleted parking lot"}
                        </Alert>
                    )}
              
                </Card.Body>
            </Card>

                    <GraphicalParkingLotModal show={showGraphic} onClose={handleCloseGraphicModal}  parkingSpaces={parkingLot.ParkingSpaces} />
                    <ManageParkingSpaceModal show={showManage} onClose={handleCloseManageModal}  parkingSpaces={parkingLot.ParkingSpaces} />

        </>
    )
}

export default ParkingLot;