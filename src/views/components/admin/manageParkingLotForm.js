import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import useAdminGetParkingLots from '../../../controllers/useAdminGetParkingLot.js';

function ManageParkingLotForm() {
    const [chosenLotID, setChosenLotID] = useState('');

    const { ManageParkLot,handleParkingLotManage, error } = useManageParkingLot();
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
        await handleParkingLotManage(chosenLot);
        console.debug(ManageParkLot);
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
                    <Form.Control as="select" onChange={handleSelectLot} data-test-id="select-manage-parking-lot" required>
                        <option>Choose...</option>
                        {parkLots.map((lot, index) => (
                            <option key={index} value={JSON.stringify({ id: lot.ID, name: lot.Name })}>{lot.Name}</option>                        
                        ))}
                    </Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group controlId="formParkingSpace">
                    <Form.Label>Select Parking Space</Form.Label>
                    <Form.Control as="select" onChange={handleSelectLot} data-test-id="select-manage-parking-lot" required>
                        <option>Choose...</option>
                        {parkLots.map((lot, index) => (
                            <option key={index} value={JSON.stringify({ id: lot.ID, name: lot.Name })}>{lot.Name}</option>                        
                        ))}
                    </Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group controlId="formParkingSpace">
                    <Form.Label>Select Status</Form.Label>
                    <Form.Control as="select" onChange={handleSelectLot} data-test-id="select-manage-parking-lot" required>
                        <option>Choose...</option>
                        {parkLots.map((lot, index) => (
                            <option key={index} value={JSON.stringify({ id: lot.ID, name: lot.Name })}>{lot.Name}</option>                        
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" data-test-id='manage-parking-lot-submit'>
                    Confirm
                </Button>

                {/* Display error message if any */}

                {parkLotError && (
                    <Alert data-test-id="get-park-lots-error-alert" className='mt-4' variant="danger">
                    {"Failed to get parking lots: " + parkLotError}
                    </Alert>
                )}
            </Form>
    );
}

export default manageParkingLotForm;
