import React from "react";
import DriversList from './components/driversList.js';
import { Container } from "react-bootstrap";
import AdminNavbar from "./components/admin/adminNavbar.js";

function ManageDrivers(){
    return (
        <>       
            <AdminNavbar />
            <Container className="mt-4">
                <DriversList />
            </Container>
        </>
    )
}

export default ManageDrivers;