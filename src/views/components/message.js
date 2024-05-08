import React from 'react';
import { Card, Col,Row } from 'react-bootstrap';

const Message = ({ message, isCurrentUser, dataTestId }) => {
    if(isCurrentUser) {
        return (
            // Put the message on the right side if you are current user.
            <Row className='mb-2'>
                <Col>
                   {/* Leave empty */}
                </Col>
                <Col>
                    <div className="d-flex justify-content-end">
                        <Card bg='primary' text='white' data-test-id={`${dataTestId}-sent-ctn`} body> {`${message.content}`}</Card>
                    </div>
                </Col>
            </Row>
        )
    } else {
        return (
            // Put the message on left side if it is sent to you.
            <Row className='mb-2'>
                <Col>
                    <div className="d-flex justify-content-start">
                        <Card bg='secondary' text='white' data-test-id={`${dataTestId}-received-ctn`} body> {`${message.content}`}</Card>
                    </div>
                </Col>
                <Col>
                    {/* Leave empty */}
                </Col>
            </Row>
        );
    }
};

export default Message;
