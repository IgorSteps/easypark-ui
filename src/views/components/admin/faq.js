import React from "react";
import { Accordion } from "react-bootstrap";

function AdminFaq() {
    return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>How do I add a parking lot?</Accordion.Header>
        <Accordion.Body>
            To add a parking lot, you must fill the form and choose the capacity and location. 
            When created, all parking spaces have 'available' status.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>How do I delete a parking lot?</Accordion.Header>
        <Accordion.Body>
            To delete a parking lot, you can click delete on the desired parking lot in your dashboard.
            Please note, that when parking lot is deleted, it deletes all associated parking spaces and parking requests.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>What should I do if a parking space needs to be blocked or reserved?</Accordion.Header>
        <Accordion.Body>
            If you need to block or reserve a parking space for events or repairs, you can change the status of the space to 'blocked' or 'reserved'.
            If the parking space had approved parking requests associated with it, this update will sever this link and change affected 
            parking requests' statuses to 'pending'.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>How do I assign a parking space to a parking request?</Accordion.Header>
        <Accordion.Body>
            When you click 'Approve' button the system will automatically check if any parking space is available and doesn't overlap with existing requests.
            If all is good, the request will get approved and assigned a space automatically. Otherwise, you may need to reject it
            and ask the driver to submit a new request with different time slot or location.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>What should I do if a driver has arrived late?</Accordion.Header>
        <Accordion.Body>
            If a driver is late check if they have arrived but failed to notify using the messaging service.
            If so, update the parking space to 'occupied' and the request to 'active'. If they haven't arrived at all, no action required.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header>What should I do if a driver has departed late?</Accordion.Header>
        <Accordion.Body>
            If a driver is late check if they have left but failed to notify using the messaging service.
            If so, update the parking space to 'available' and the request to 'completed'. If they haven't left at all, call the police.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    )
}

export default AdminFaq