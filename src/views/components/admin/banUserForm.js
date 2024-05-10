import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import useBanUser from '../../../controllers/useBanUser.js';
import useGetDrivers from '../../../controllers/useGetAllDrivers.js';

function BanUserForm() {
    const [chosenBanID, setChosenBanID] = useState('');

    const { banUserResult, handleBanUser, banUserError } = useBanUser();
    const { drivers, fetchDrivers, error } = useGetDrivers();

    const handleSelectBanID = (e) => {
        if (e.target.value !== "Choose..."){
            const selectedValue = JSON.parse(e.target.value);
            setChosenBanID(selectedValue.id);
        } else{
            setChosenBanID("Invalid");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const banID = {chosenBanID};
        await handleBanUser({id:chosenBanID,status:"ban"});
    };

    // Fetch drivers every 10 seconds.
        useEffect(() => {
        const fetchData = async () => {
            await fetchDrivers();
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);

    if (drivers.length === 0) {
        return (
            <Alert data-test-id="no-drivers-info-alert" className='mt-4' variant="info">
                {"No drivers found, come back later..."}
            </Alert>
        )
    }

    return (
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formParkingLot">
                    <Form.Label>Select Driver</Form.Label>
                    <Form.Control as="select" onChange={handleSelectBanID} data-test-id="select-ban-user" required>
                        <option>Choose...</option>
                        {drivers.map((lot, index) => (
                            <option key={index} value={JSON.stringify({ username: lot.Username, id: lot.ID })}>{lot.Username}</option>                        
                        ))}
                    </Form.Control>
                </Form.Group>
                <br></br>
                <Button variant="primary" type="submit" data-test-id='select-ban-user-submit'>
                    Delete
                </Button>

                {/* Display error message if any */}

                {error && (
                    <Alert data-test-id="get-drivers-error-alert" className='mt-4' variant="danger">
                    {"Failed to get parking lots: " + error}
                    </Alert>
                )}

                {banUserError && (
                    <Alert data-test-id="ban-driver-error-alert" className='mt-4' variant="danger">
                    {"Failed to ban user: " + banUserError}
                    </Alert>
                )}

                {banUserResult && (
                    <Alert data-test-id="ban-driver-success-alert" className='mt-4' variant="success">
                    {"Successfully banned driver"}
                    </Alert>
                )}

            </Form>
    );
}

export default BanUserForm;
