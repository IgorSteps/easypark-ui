import React, { useState } from 'react';
import { Button, Container, Alert, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useCreateParkingLotController from '../../../controllers/createParkingLotController.js';

export default function CreateParkingLotForm() {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const { parkLot, handleParkingLotCreation, error } = useCreateParkingLotController();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleParkingLotCreation({ name, capacity: parseInt(capacity)});
  };

  return (
      <Form onSubmit={handleSubmit}>

          <Form.Group controlId="formBasicLotName">
            <Form.Label>Name: </Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              data-test-id="lot-name-input"
            />
          </Form.Group>

          <Form.Group className="mt-3" controlId="formBasicCapacity">
            <Form.Label>Capacity: </Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter capacity" 
              value={capacity} 
              onChange={(e) => setCapacity(e.target.value)} 
              required 
              data-test-id="lot-capacity-input"
            />
          </Form.Group>

          <Button 
            className="mt-4"
            variant="primary"
            type="submit"
            data-test-id="create-parking-lot-submit-button"
          >
            Confirm
          </Button>

          {error && (
            <Alert data-test-id="create-park-lot-alert" className='mt-4' variant="danger">
              {error}
            </Alert>
          )}

          {parkLot && (
            <Alert data-test-id="create-park-lot-success-alert" className='mt-4' variant="success">
              {"Successfully created parking lot"}
            </Alert>
          )}
    </Form>
  );
}