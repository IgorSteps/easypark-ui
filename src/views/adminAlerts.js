import React from "react";
import AlertList from "./components/admin/alertList.js";
import { Container } from "react-bootstrap";
import AdminNavbar from "./components/admin/adminNavbar.js";

function AdminAlerts() {
    return (
        <>       
            <AdminNavbar />
            <Container className="mt-4">
                <AlertList />
            </Container>
        </>
    )
}

export default AdminAlerts;