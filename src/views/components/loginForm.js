import React, { useState } from 'react';
import { Button, Container, Alert, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useLoginController from '../../controllers/loginController.js';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, error } = useLoginController();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
  };

  return (
    <Container className='form-container'>
      <Form className='form-border' onSubmit={handleSubmit}>
        <Container className='form-content'>

          <h1 className='form-title'>
            EasyPark Login
          </h1>

          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              data-test-id="login-username-input"
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
              data-test-id="login-password-input"
            />
          </Form.Group>

          <Button 
            className="mt-4"
            variant="link"
            as={Link}
            to="/register"
            data-test-id="register-link-button"
          >
            New to Easypark? Register here
          </Button>
          <br/>

          <Button 
            className="mt-4"
            variant="primary"
            type="submit"
            data-test-id="login-submit-button"
          >
            Log In
          </Button>

          {/* Display error message if any */}
          {error && (
            <Alert data-test-id="login-alert" className='mt-4' variant="danger">
              {error}
            </Alert>
          )}
          
        </Container>
    </Form>
  </Container>
  );
}
