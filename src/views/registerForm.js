import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Alert, Form } from 'react-bootstrap';
import useRegisterController from '../controllers/registerController.js';

export default function RegisterForm() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { handleRegister, error } = useRegisterController();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegister({ firstname, lastname, username, password, email });
  };

  return (
    <Container className='form-container'>
      <Form className='form-border' onSubmit={handleSubmit}>
        <Container className='form-content'>
            <Button 
                className="mt-4"
                variant="link"
                as={Link}
                to="/login"
                data-test-id="login-link-button"
            >
                Back to login
            </Button>

          <h1 className='form-title'>
            EasyPark Register
          </h1>

          <Form.Group controlId="formBasicFirstname">
            <Form.Label>First name:</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter firstname" 
              value={firstname} 
              onChange={(e) => setFirstname(e.target.value)} 
              required 
              data-test-id="register-firstname-input"
            />
          </Form.Group>

          <Form.Group controlId="formBasicLastname">
            <Form.Label>Last name:</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter lastname" 
              value={lastname} 
              onChange={(e) => setLastname(e.target.value)} 
              required 
              data-test-id="register-lastname-input"
            />
          </Form.Group>

          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              data-test-id="register-username-input"
            />
          </Form.Group>

          <Form.Group className="mt-3" controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Enter password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              data-test-id="register-password-input"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              data-test-id="register-email-input"
            />
          </Form.Group>


          <Button 
            className="mt-4"
            variant="primary"
            type="submit"
            data-test-id="register-submit-button"
          >
            Register
          </Button>

          {error && (
            <Alert data-test-id="register-alert" className='mt-4' variant="danger">
              {error}
            </Alert>
          )}
          
        </Container>
    </Form>
  </Container>
  );
}
