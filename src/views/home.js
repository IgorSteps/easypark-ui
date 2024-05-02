import React from 'react';
import { Container, Navbar, Nav, Jumbotron, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

        <Container>
          <h1>Welcome to Our Website</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Container>

      <Container fluid style={{ backgroundColor: 'lightgray', textAlign: 'center', padding: '10px' }}>
        <p>Footer Content Here</p>
      </Container>
    </>
  );
}

export default Home;
