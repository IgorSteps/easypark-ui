import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import useParkingRequest from '../../controllers/useParkingRequest.js';
import useParkingLots from '../../controllers/useParkingLot.js';

function ParkingRequestForm() {
    const [destination, setDestination] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const { createRequest, parkReq, error } = useParkingRequest();
    const { parkLots, fetchParkLots, parkLotError } = useParkingLots();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestBody = { destination, startTime, endTime };
        await createRequest(requestBody);
    };

    useEffect(() => {
        fetchParkLots();
    }, []);

    return (
        <Form onSubmit={handleSubmit}>
        
            <Form.Group controlId="formParkingLot">
                <Form.Label>Select Parking Lot</Form.Label>
                <Form.Control as="select" value={destination} onChange={e => setDestination(e.target.value)} data-test-id="select-parking-lot">
                    <option value="">Choose...</option>
                    {parkLots.map((lot, index) => (
                        <option key={index} value={lot.ID}>{lot.Name}</option>                        
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
            <Form.Group controlId="formEndDate">
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
                {"Failed to create parking request:" + error}
                </Alert>
            )}
            {parkLotError && (
                <Alert data-test-id="get-park-lots-error-alert" className='mt-4' variant="danger">
                {"Failed to get parking lots:" + parkLotError}
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
