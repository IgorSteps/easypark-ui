import {Button, Modal, Row, Col} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import useLogoutController from '../../controllers/logoutController.js';

function LogoutModal({show, handleClose}) {

    const { logout, handleLogout, error } = useLogoutController();

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Are you sure you want to logout?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className='mt-2' md='auto'>
                    <>
                        <Col>
                            <Button variant="success" onClick={handleLogout}>
                                        Yes
                                    </Button>
                                </Col>
                                <Col>
                                    <Button variant="danger" onClick={handleClose}>
                                       No
                                    </Button>
                                </Col>

                                {error && (
                                    <Alert data-test-id="logout-alert" className='mt-4' variant="danger">
                                    {error}
                                    </Alert>
                                )}
                    </>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

export default LogoutModal;