import React from "react";
import DriverFaq from "./components/driver/faq.js";
import DriverNavbar from "./components/driverNavbar.js";
import { Container } from "react-bootstrap";
import AdminFaq from "./components/admin/faq.js";
import AdminNavbar from "./components/admin/adminNavbar.js";

export function DriverFAQPage() {
    return (
        <>
        <DriverNavbar />
        <Container className="mt-4">
            <DriverFaq />
        </Container>
        </>
    )
}

export function AdminFAQPage() {
    return (
        <>
        <AdminNavbar />
        <Container className="mt-4">
            <AdminFaq />
        </Container>
        </>
    )
}

