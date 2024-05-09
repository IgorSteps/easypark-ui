import React, { useState } from 'react';
import { Button, Container, Alert, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useCreateParkingLotController from '../../../controllers/createParkingLotController.js';

export default function CreateParkingLotForm() {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const { handleParkingLotCreation, error } = useCreateParkingLotController();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleParkingLotCreation({ name, capacity: parseInt(capacity)});
  };

  return (
    <Container className='form-container'>
      <Form className='form-border' onSubmit={handleSubmit}>
        <Container className='form-content'>

          <h1 className='form-title'>
            Create Parking Lot
          </h1>

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
              min={30}
              max={1000}
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
            <Alert data-test-id="create-parking-lot-alert" className='mt-4' variant="danger">
              {error}
            </Alert>
          )}
          
        </Container>
    </Form>
  </Container>
  );
}