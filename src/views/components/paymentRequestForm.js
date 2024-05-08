import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import useCreatePayment from '../../controllers/useCreatePayment.js';

function PaymentRequestForm() {
    const [name, setName] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [CardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [CVC, setCVC] = useState('');

    const {createRequest, payReq, error} = useCreatePayment()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const req = {
            name, billingAddress, CardNumber:parseInt(CardNumber), expiryDate, CVC:parseInt(CVC) 
        };
        console.log(req)
        await createRequest(req);
    };

    return (
        <Form onSubmit={handleSubmit}>
        
            <Form.Group controlId="formName" required>
                <Form.Label>Cardholder Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} data-test-id="name-input" required/>
            </Form.Group>

            <Form.Group controlId="formAddress" required>
                <Form.Label>Billing Address</Form.Label>
                <Form.Control type="text" placeholder="Enter billing address" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} data-test-id="address-input" required/>
            </Form.Group>

            <Form.Group controlId="formCardNumber" required>
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="text" placeholder="Enter card number" value={CardNumber} onChange={(e) => setCardNumber(e.target.value)} data-test-id="card-number-input" required/>
            </Form.Group>

            <Form.Group controlId="formExpiryDate" required>
                <Form.Label>Card Expiry Date</Form.Label>
                <DatePicker.default 
                    selected={expiryDate} 
                    onChange={date => setExpiryDate(date)} 
                    showTimeSelect 
                    dateFormat="yyyy-MM-dd'T'HH:mm:ss"
                    timeFormat="HH:mm"
                />
            </Form.Group>

            <Form.Group controlId="formCVC" required>
                <Form.Label>CVC</Form.Label>
                <Form.Control type="text" placeholder="Enter card verification code" value={CVC} onChange={(e) => setCVC(e.target.value)} data-test-id="cvc-input" required/>
            </Form.Group>
            
            <Button variant="primary" type="submit" data-test-id='pay-req-submit'>
                Submit
            </Button>

            {/* Display error message if any */}
            {error && (
                <Alert data-test-id="create-pay-request-error-alert" className='mt-4' variant="danger">
                {"Failed to create payment request: " + error}
                </Alert>
            )}

            {/* Display success message if any */}
            {payReq && (
                <Alert data-test-id="create-pay-request-success-alert" className='mt-4' variant="success">
                {"Payment sent successfully"}
                </Alert>
            )}

        </Form>
    );
}

export default PaymentRequestForm;
