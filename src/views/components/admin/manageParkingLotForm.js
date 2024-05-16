import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import useAdminGetParkingLot from '../../../controllers/useAdminGetParkingLot.js';
import { updateParkingSpaceStatus } from '../../../models/manageParkingLot.js';

function ManageParkingLotForm({ parkingSpaces }) {
    const [chosenLot, setChosenLot] = useState(null);
    const [selectedSpace, setSelectedSpace] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [updateError, setUpdateError] = useState(null);

    const { parkLots, fetchParkLots, parkLotError } = useAdminGetParkingLot();

    const handleSelectLot = (e) => {
        if (e.target.value !== "Choose...") {
            const selectedValue = JSON.parse(e.target.value);
            setChosenLot(selectedValue.id);
        } else {
            setChosenLot("Invalid");
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
        if (chosenLot && selectedSpace && selectedStatus) {
            try {
                await updateParkingSpaceStatus(selectedSpace, selectedStatus);
                alert('Parking space status updated successfully');
            } catch (err) {
                setUpdateError(err.message);
            }
        } else {
            alert('Please select a parking lot, space, and status');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchParkLots();
        };

        fetchData();

        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, []);

    if (parkLots.length === 0) {
        return (
            <Alert data-test-id="no-park-lots-info-alert" className='mt-4' variant="info">
                {"There are no parking lots found, come back later..."}
            </Alert>
        );
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
            <br />
            <Form.Group controlId="formParkingSpace">
                <Form.Label>Select Parking Space</Form.Label>
                <Form.Control as="select" onChange={handleSelectSpace} data-test-id="select-manage-parking-space" required>
                    <option>Choose...</option>
                    {parkingSpaces.map((space, index) => (
                        <option key={index} value={space.ID}>{space.Name}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId="formParkingStatus">
                <Form.Label>Select Status</Form.Label>
                <Form.Control as="select" onChange={handleSelectStatus} data-test-id="select-manage-parking-status" required>
                    <option>Choose...</option>
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="blocked">Blocked</option>
                    <option value="reserved">Reserved</option>
                </Form.Control>
            </Form.Group>
            <br />
            <Button variant="primary" type="submit" data-test-id='manage-parking-lot-submit'>
                Confirm
            </Button>

            {updateError && (
                <Alert data-test-id="update-error-alert" className='mt-4' variant="danger">
                    {updateError}
                </Alert>
            )}
            {parkLotError && (
                <Alert data-test-id="get-park-lots-error-alert" className='mt-4' variant="danger">
                    {"Failed to get parking lots: " + parkLotError}
                </Alert>
            )}
        </Form>
    );
}

export default ManageParkingLotForm;
