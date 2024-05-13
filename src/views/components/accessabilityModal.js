import {Button, Modal, Form} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

const defaultFontSize = 18;

function AccessabilityModal({show, handleClose}) {
    // Font.
    const [fontSize, setFontSize] = useState(defaultFontSize);
    const handleFontSizeChange = (newSize) => {
        setFontSize(newSize);
    };
    useEffect(() => {
        document.
            documentElement.
            style.
            setProperty('--dynamic-font-size', `${fontSize}px`);
    }, [fontSize]);

    // Theme.
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const toggleLightTheme = () => {
        setTheme('light');
    };
    const toggleDarkTheme = () => {
        setTheme('dark');
    };
    useEffect(() => {
        document.
            documentElement.
            setAttribute('data-bs-theme', theme);
            localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Accessability</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Label>Adjust font size here:</Form.Label>
                <Form.Range 
                    value={fontSize}
                    onChange={e => handleFontSizeChange(e.target.value)}
                    data-test-id='font-slider'
                />

                <p>Choose colour scheme:</p>
                    <Button className='mx-2' onClick={toggleLightTheme} data-test-id='light-scheme-btn'>
                        Light
                    </Button>
                    <Button className='mx-2' onClick={toggleDarkTheme} data-test-id='dark-scheme-btn'>
                        Dark
                    </Button>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} data-test-id='close-btn'>Close</Button>
                <Button variant="primary" onClick={handleClose}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AccessabilityModal;