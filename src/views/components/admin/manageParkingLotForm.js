import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import useAdminGetParkingLot from '../../../controllers/useAdminGetParkingLot.js';
import { updateParkingSpaceStatus } from '../../../models/manageParkingLot.js';

function ManageParkingLotForm({ parkingSpaces }) {
    const [selectedSpace, setSelectedSpace] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [updateError, setUpdateError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(null);

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
        setUpdateError(null);
        setUpdateSuccess(null);

        if (selectedSpace && selectedStatus) {
            try {
                const response = await updateParkingSpaceStatus(selectedSpace, selectedStatus);
                if (response.error) {
                    throw new Error(response.error);
                }
                setUpdateSuccess('Parking space status updated successfully');
            } catch (err) {
                setUpdateError(err.message);
            }
        } else {
            setUpdateError('Please select a space and status');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
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
            {updateSuccess && (
                <Alert data-test-id="update-success-alert" className='mt-4' variant="success">
                    {updateSuccess}
                </Alert>
            )}
        </Form>
    );
}

export default ManageParkingLotForm;
