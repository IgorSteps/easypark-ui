import React from "react";
import DriverFaq from "./components/driver/faq.js";
import DriverNavbar from "./components/driverNavbar.js";
import { Container } from "react-bootstrap";

function DriverFAQPage() {
    return (
        <>
        <DriverNavbar />
        <Container className="mt-4">
            <DriverFaq />
        </Container>
        </>
    )
}

export default DriverFAQPage