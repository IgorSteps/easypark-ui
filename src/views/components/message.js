import React from 'react';
import { Card, Col,Row } from 'react-bootstrap';

const Message = ({ message, isCurrentUser }) => {
    if(isCurrentUser) {
        return (
            // Put the message the right if you are current user.
            <Row>
                <Col>
                   {/* Leave empty */}
                </Col>
                <Col>
                    {/*  Push to the right-most part of the column and adjust to message text size */}
                    <div className="d-flex justify-content-end">
                        <Card bg='primary' text='white' body> {`${message.content}`}</Card>
                    </div>
                </Col>
            </Row>
        )
    } else {
        return (
            // Put the message on left or right if you are current user.
            <Row>
                <Col>
                    {/*  Push to the left-most part of the column and adjust to message text size */}
                    <div className="d-flex justify-content-start">
                        <Card bg='secondary' text='white' body> {`${message.content}`}</Card>
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
