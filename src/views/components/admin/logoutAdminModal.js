import {Button, Modal, Row, Col} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import useAdminLogoutController from '../../../controllers/logoutAdminController.js';

function LogoutAdminModal({show, handleClose}) {

    const { logout, handleLogout } = useAdminLogoutController();

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
                    </>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

export default LogoutAdminModal;