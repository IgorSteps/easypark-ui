import React from "react";
import NotificationList from "./components/admin/notificationList.js";
import { Container } from "react-bootstrap";
import AdminNavbar from "./components/admin/adminNavbar.js";

function AdminNotifications() {
    return (
        <>       
            <AdminNavbar />
            <Container className="mt-4">
                <NotificationList />
            </Container>
        </>
    )
}

export default AdminNotifications;