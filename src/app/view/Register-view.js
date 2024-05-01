"use client"

import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import CheckRegisterDetails from '../controller/Register-controller';
import { useNavigate } from "react-router-dom";
import CheckLoginDetails from '../controller/Login-controller';

export default function Register() {
  let Navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstNameEmpty, setFirstNameEmpty] = useState(false);
  const [lastNameEmpty, setLastNameEmpty] = useState(false);
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  async function SubmitAccountDetails() {
    if (!username.trim() || !password.trim() || !firstName.trim() || !lastName.trim() || !email.trim()) {
      setUsernameEmpty(!username.trim());
      setPasswordEmpty(!password.trim());
      setFirstNameEmpty(!firstName.trim());
      setLastNameEmpty(!lastName.trim());
      setEmailEmpty(!email.trim());
      return;
    }

    try {
      let result = await CheckRegisterDetails(firstName, lastName, username, password, email);
      if (result === "invalid") {
        alert("error 1")
        alert(error)
      } else if (result === "error") {
        alert("Username or email already in use, use a different username or email")
      } else {
        let result = await CheckLoginDetails(username, password);
        const token = result.token;
        alert(token)
        if (token === "a131a9a0-8d09-4166-b6fc-f8a08ba549e9") {
          Navigate("/adminHomepage");
        } else {
          Navigate("/driverHomepage");
        }
      }
    } catch (error) {
        alert(error)
    }
  }

  return (
    <body style={{ position: 'absolute', margin: 0, padding: 0, width: '100%', height: '100%', fontFamily: 'Helvetica' }}>
      <div id="root" style={{ position: 'relative', textAlign: 'center' }}>
        <div style={{ marginTop: '100px' }}>
          <Link to="/login" style={{ fontSize: '20px' }}>Back to Login Page</Link>
          <div id="form" style={{
            backgroundColor: 'white',
            color: 'black',
            border: '2px solid black',
            borderRadius: '10px',
            padding: '20px',
            maxWidth: '400px',
            margin: '0 auto',
            marginTop: '50px'
          }}>
            <p style={{ fontFamily: 'Helvetica', fontSize: '16px', marginTop: '10px' }}>Fill all input fields in the form below</p>
            <br></br>
            <div style={{ textAlign: "center" }}>
              <Form className="registerForm">
                <Form.Group controlId="formFirstName">
                  <Form.Label style={{ fontFamily: 'Helvetica', fontSize: '1.5em' }}>First Name:</Form.Label>
                  <Form.Control required type="text" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ fontSize: '1.5em', padding: '10px', margin: '10px' }} />
                  {firstNameEmpty && <p style={{ color: 'red', textAlign: 'Center', fontFamily: 'Helvetica' }}>Please enter your first name</p>}
                </Form.Group>

                <Form.Group controlId="formLastName">
                  <Form.Label style={{ fontFamily: 'Helvetica', fontSize: '1.5em' }}>Last Name:</Form.Label>
                  <Form.Control required type="text" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ fontSize: '1.5em', padding: '10px', margin: '10px' }} />
                  {lastNameEmpty && <p style={{ color: 'red', textAlign: 'Center', fontFamily: 'Helvetica' }}>Please enter your last name</p>}
                </Form.Group>

                <Form.Group controlId="formUsername">
                  <Form.Label style={{ fontFamily: 'Helvetica', fontSize: '1.5em' }}>Username:</Form.Label>
                  <Form.Control required type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ fontSize: '1.5em', padding: '10px', margin: '10px' }} />
                  {usernameEmpty && <p style={{ color: 'red', textAlign: 'Center', fontFamily: 'Helvetica' }}>Please enter a username</p>}
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label style={{ fontFamily: 'Helvetica', fontSize: '1.5em' }}>Password:</Form.Label>
                  <Form.Control required type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ fontSize: '1.5em', padding: '10px', margin: '10px' }} />
                  {passwordEmpty && <p style={{ color: 'red', textAlign: 'Center', fontFamily: 'Helvetica' }}>Please enter a password</p>}
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label style={{ fontFamily: 'Helvetica', fontSize: '1.5em' }}>Email:</Form.Label>
                  <Form.Control required type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ fontSize: '1.5em', padding: '10px', margin: '10px' }} />
                  {emailEmpty && <p style={{ color: 'red', textAlign: 'Center', fontFamily: 'Helvetica' }}>Please enter an email</p>}
                </Form.Group>
              </Form>
            </div>
            <br></br>
            <button
              style={{
                border: isHovered ? "2px solid #ED61BA" : "2px solid black",
                borderRadius: "10px",
                paddingTop: "15px",
                paddingBottom: "15px",
                paddingLeft: "20px",
                paddingRight: "20px",
                color: isHovered ? "white" : "black",
                background: isHovered ? "black" : "#ED61BA",
                display: "block",
                marginTop: "10px",
                marginBottom: "10px",
                marginRight: "auto",
                marginLeft: "auto",
                cursor: "pointer",
                fontSize: "20px",
                fontFamily: "Helvetica"
              }}
              onClick={SubmitAccountDetails}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Register account
            </button>
          </div>
        </div>
      </div>
    </body>
  );
}