import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import useDeleteParkingLot from '../../../controllers/useDeleteParkingLot.js';
import useAdminGetParkingLots from '../../../controllers/useAdminGetParkingLot.js';

function DeleteParkingLotForm() {
    const [chosenLotID, setChosenLotID] = useState('');

    const { deleteParkLot,handleParkingLotDeletion, error } = useDeleteParkingLot();
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
        console.debug(deleteParkLot);
    };


    useEffect(() => {
        const fetchData = async () => {
            await fetchParkLots();
        };

        // Initially fetch data on component load.
        fetchData();

        // Set up interval to poll every 5 seconds.
        const intervalId = setInterval(fetchData, 5000);

        // Clean up interval on component unload.
        return () => clearInterval(intervalId);
    }, []);

    if (parkLots.length === 0) {
        return (
            <Alert data-test-id="no-park-lots-info-alert" className='mt-4' variant="info">
                {"There are no parking lots found, come back later..."}
            </Alert>
        )
    }

    return (
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formParkingLot">
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

                {parkLotError && (
                    <Alert data-test-id="get-park-lots-error-alert" className='mt-4' variant="danger">
                    {"Failed to get parking lots: " + parkLotError}
                    </Alert>
                )}

                {error && (
                    <Alert data-test-id="delete-park-error-alert" className='mt-4' variant="danger">
                    {"Failed to delete parking lot: " + error}
                    </Alert>
                )}

                {deleteParkLot && (
                    <Alert data-test-id="delete-park-lot-success-alert" className='mt-4' variant="success">
                    {"Successfully deleted parking lot"}
                    </Alert>
                )}

            </Form>
    );
}

export default DeleteParkingLotForm;
