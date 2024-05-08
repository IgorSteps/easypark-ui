import React from "react";
import ParkingRequestList from "./components/admin/adminsParkingRequestList.js";
import { Container } from "react-bootstrap";
import AdminNavbar from "./components/admin/adminNavbar.js";

function AdminParkingRequests() {
    return (
        <>       
            <AdminNavbar />
            <Container className="mt-4">
                <ParkingRequestList />
            </Container>
        </>
    )
}

export default AdminParkingRequests;