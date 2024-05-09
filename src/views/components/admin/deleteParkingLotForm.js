import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import useDeleteParkingLot from '../../../controllers/useDeleteParkingLot.js';
import useAdminGetParkingLots from '../../../controllers/useAdminGetParkingLot.js';

function DeleteParkingLotForm() {
    const [chosenLotID, setChosenLotID] = useState('');

    const { handleParkingLotDeletion, error } = useDeleteParkingLot();
    const { parkLots, fetchParkLots, parkLotError } = useAdminGetParkingLots();

    const handleSelectLot = (e) => {
        if (e.target.value !== "Choose..."){
            const selectedValue = JSON.parse(e.target.value);
            setChosenLotID(selectedValue.id);
        } else{
            setChosenLotID("Invalid");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const chosenLot = {chosenLotID};
        await handleParkingLotDeletion(chosenLot);
    };

    useEffect(() => {
        fetchParkLots();
    }, []);

    if (parkLots.length === 0) {
        return (
            <Alert data-test-id="no-park-lots-info-alert" className='mt-4' variant="info">
                {"There are no parking lots found, come back later..."}
            </Alert>
        )
    }

    return (
        <Container className='form-container'>
            <Form className='form-border' onSubmit={handleSubmit}>
                <Container className='form-content'>
                    <Form.Group controlId="formParkingLot">
                        <h1 className='form-title'>Delete parking lot</h1>
                        <Form.Label>Select Parking Lot</Form.Label>
                        <Form.Control as="select" onChange={handleSelectLot} data-test-id="select-delete-parking-lot" required>
                            <option>Choose...</option>
                            {parkLots.map((lot, index) => (
                                <option key={index} value={JSON.stringify({ id: lot.ID, name: lot.Name })}>{lot.Name}</option>                        
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <br></br>
                    <Button variant="primary" type="submit" data-test-id='delete-parking-lot-submit'>
                        Delete
                    </Button>

                    {/* Display error message if any */}
                    {error && (
                        <Alert data-test-id="delete-park-error-alert" className='mt-4' variant="danger">
                        {"Failed to delete parking lot: " + error}
                        </Alert>
                    )}
                    {parkLotError && (
                        <Alert data-test-id="get-park-lots-error-alert" className='mt-4' variant="danger">
                        {"Failed to get parking lots: " + parkLotError}
                        </Alert>
                    )}
                </Container>
            </Form>
        </Container>
    );
}

export default DeleteParkingLotForm;
