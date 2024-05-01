"use client"

import { useState } from "react";
import CheckLoginDetails from '../controller/Login-controller';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  let Navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  async function SubmitLoginDetails(){
    if (!username.trim() || !password.trim()) {
      setUsernameEmpty(!username.trim());
      setPasswordEmpty(!password.trim());
      return;
    }

    try {
      let result = await CheckLoginDetails(username, password);
      if (result === "invalid"){
        setIncorrectCredentials(false);
      } else if (result === "error"){
        setIncorrectCredentials(true);
        setUsernameEmpty(false);
        setPasswordEmpty(false);
      } else {
        setIncorrectCredentials(false);
        const token = result.token;
        console.log(token);
        if (username === "adminUsername") {
          Navigate("/adminHomepage");
        } else {
          Navigate("/driverHomepage");
        }
      }
    } catch(error){
        alert(error);
    }
  }

  return (
    <body style={{ position: 'absolute', margin: 0, padding: 0, width: '100%', height: '100%' }}>
      <div id="root" style={{ position: 'relative' }}>
        <div id="headerbackground" style={{
          position: 'relative',
          top: 0,
          left: 0,
          width: '100%',
          height: '200px',
          backgroundColor: 'black',
          zIndex: -1,
        }}></div>
        <h1 style={{ textAlign: "center", fontWeight: 'bold', fontSize: '100px', zIndex: 1, fontFamily: 'helvetica', position: 'absolute', width: '100%', top: '-3.5%', color: 'white' }}>EASYPARK</h1>
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
          <p style={{ textAlign: "center", fontSize: "40px", fontFamily: 'helvetica' }}>Login</p>
          <br></br>
          <div style={{textAlign:"center"}}>
            <Form className="loginForm">
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
            </Form>
          </div>
          <br></br>
          {incorrectCredentials && <p style={{ color: 'red', textAlign: 'center', fontFamily: 'Helvetica' }}>Either the username or password is incorrect</p>}
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
            onClick={SubmitLoginDetails}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Login
          </button>
          <p style={{ textAlign: "center", fontFamily: 'Helvetica' }}>
            Don't have an account? <Link to="/register">Register an account here</Link>
          </p>
        </div> 
      </div>
    </body>
  );
}