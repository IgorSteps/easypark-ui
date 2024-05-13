import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap'

function AdminNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/admin-parking-requests">Parking Requests</Nav.Link>
            <Nav.Link href="/admin-faq">FAQ</Nav.Link>
            <Nav.Link href="/manage-drivers">Manage Drivers</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;