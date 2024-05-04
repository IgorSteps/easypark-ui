import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import useParkingRequest from '../../controllers/useParkingRequest.js';
import useParkingLots from '../../controllers/useParkingLot.js';

function ParkingRequestForm() {
    const [destinationLotID, setDestinationLotID] = useState('');
    const [destinationLotName, setDestinationLotName] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const { createRequest, parkReq, error } = useParkingRequest();
    const { parkLots, fetchParkLots, parkLotError } = useParkingLots();

    // Parse lot name and id.
    const handleSelectLot = (e) => {
        const selectedValue = JSON.parse(e.target.value);
        console.debug("parsed destination lot ID and Name", selectedValue)
        setDestinationLotID(selectedValue.id);
        setDestinationLotName(selectedValue.name);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestBody = { destinationLotID, destinationLotName, startTime, endTime };
        await createRequest(requestBody);
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
        <Form onSubmit={handleSubmit}>
        
            <Form.Group controlId="formParkingLot">
                <Form.Label>Select Parking Lot</Form.Label>
                <Form.Control as="select" onChange={handleSelectLot} data-test-id="select-parking-lot" required>
                    <option>Choose...</option>
                    {parkLots.map((lot, index) => (
                        <option key={index} value={JSON.stringify({ id: lot.ID, name: lot.Name })}>{lot.Name}</option>                        
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formStartDate">
                <Form.Label className='me-3'>Start Date and Time</Form.Label>
                <DatePicker.default 
                    selected={startTime} 
                    onChange={date => setStartTime(date)}
                    showTimeSelect 
                    dateFormat="yyyy-MM-dd'T'HH:mm:ss"
                    timeFormat="HH:mm"
                />
            </Form.Group>
            <Form.Group controlId="formEndDate" required>
                <Form.Label className='me-3' >End Date and Time</Form.Label>
                <DatePicker.default 
                    selected={endTime} 
                    onChange={date => setEndTime(date)} 
                    showTimeSelect 
                    dateFormat="yyyy-MM-dd'T'HH:mm:ss"
                    timeFormat="HH:mm"
                />
            </Form.Group>
            <Button variant="primary" type="submit" data-test-id='park-req-submit'>
                Submit
            </Button>

            {/* Display error message if any */}
            {error && (
                <Alert data-test-id="create-park-request-error-alert" className='mt-4' variant="danger">
                {"Failed to create parking request: " + error}
                </Alert>
            )}
            {parkLotError && (
                <Alert data-test-id="get-park-lots-error-alert" className='mt-4' variant="danger">
                {"Failed to get parking lots: " + parkLotError}
                </Alert>
            )}

            {/* Display success message if any */}
            {parkReq && (
                <Alert data-test-id="create-park-request-success-alert" className='mt-4' variant="success">
                {"Successfully created parking request"}
                </Alert>
            )}

        </Form>
    );
}

export default ParkingRequestForm;
