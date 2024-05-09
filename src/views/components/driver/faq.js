import React from "react";
import { Accordion } from "react-bootstrap";

function DriverFaq() {
    return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>My parking request was rejected, what do I do?</Accordion.Header>
        <Accordion.Body>
            If your parking request is rejected, it means the the system was unable to find a suitable available space.
            Please submit a new parking request with different time slot or location.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>How do I confirm my arrival ro departure?</Accordion.Header>
        <Accordion.Body>
            You must send an arrival/departure notifications using the button on your parking request. 
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>I need to extend my parking time, what should I do?</Accordion.Header>
        <Accordion.Body>
            If you need to stay longer at your parking space, you must submit a new parking request for the duration of the overtime, 
            and subsequently move to the newly assigned parking space. Don't forget about departure and arrival notifications.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>I've arrive at my parking space and it's occupied?</Accordion.Header>
        <Accordion.Body>
            Message the admin through our messaging service. They will help you.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>How do I check the status of my parking request?</Accordion.Header>
        <Accordion.Body>
            You can check the status of your parking requests on your dashboard.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    )
}

export default DriverFaq