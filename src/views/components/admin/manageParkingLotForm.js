import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import useAdminGetParkingLots from '../../../controllers/useAdminGetParkingLot.js';

function ManageParkingLotForm() {
    const [chosenLot, setChosenLot] = useState(null);
    const [parkingSpaces, setParkingSpaces] = useState([]);
    const [selectedSpace, setSelectedSpace] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);

    const { parkLots, fetchParkLots, parkLotError } = useAdminGetParkingLots();

    const handleSelectLot = (e) => {
        if (e.target.value !== "Choose...") {
            const selectedLot = JSON.parse(e.target.value);
            setChosenLot(selectedLot);
            setParkingSpaces(selectedLot.ParkingSpaces);
        } else {
            setChosenLot(null);
            setParkingSpaces([]);
        }
    };

    const handleSelectSpace = (e) => {
        if (e.target.value !== "Choose...") {
            setSelectedSpace(e.target.value);
        } else {
            setSelectedSpace(null);
        }
    };

    const handleSelectStatus = (e) => {
        if (e.target.value !== "Choose...") {
            setSelectedStatus(e.target.value);
        } else {
            setSelectedStatus(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const chosenLotID = chosenLot.ID;
        const parkingSpaceID = selectedSpace;
        const parkingSpaceStatus = selectedStatus;
        // Handle the submission logic here
        console.debug({ chosenLotID, parkingSpaceID, parkingSpaceStatus });
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
                        <option key={index} value={JSON.stringify(lot)}>{lot.Name}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <br />
            {chosenLot && (
                <Form.Group controlId="formParkingSpace">
                    <Form.Label>Select Parking Space</Form.Label>
                    <Form.Control as="select" onChange={handleSelectSpace} data-test-id="select-manage-parking-lot" required>
                        <option>Choose...</option>
                        {parkingSpaces.map((space, index) => (
                            <option key={index} value={space.ID}>{space.Name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
            )}
            <br />
            {selectedSpace && (
                <Form.Group controlId="formParkingSpaceStatus">
                    <Form.Label>Select Status</Form.Label>
                    <Form.Control as="select" onChange={handleSelectStatus} data-test-id="select-parking-space-status" required>
                        <option>Choose...</option>
                        <option value="Available">Pending</option>
                        <option value="Occupied">Rejected</option>
                        <option value="Reserved">Active</option>
                        <option value="Reserved">Completed</option>
                    </Form.Control>
                </Form.Group>
            )}
            <br />
            <Button variant="primary" type="submit" data-test-id='manage-parking-lot-submit'>
                Confirm
            </Button>

            {parkLotError && (
                <Alert data-test-id="get-park-lots-error-alert" className='mt-4' variant="danger">
                    {"Failed to get parking lots: " + parkLotError}
                </Alert>
            )}
        </Form>
    );
}

export default ManageParkingLotForm;