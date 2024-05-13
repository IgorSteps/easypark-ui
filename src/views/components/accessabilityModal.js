import {Button, Modal} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

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
                <Modal.Title>Accessbility</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Adjust font size here:</p>

                <RangeSlider
                    value={fontSize}
                    onChange={e => handleFontSizeChange(e.target.value)}
                />

                <p>Choose colour scheme:</p>
                    <Button className='mx-2' onClick={toggleLightTheme}>
                        Light
                    </Button>
                    <Button className='mx-2' onClick={toggleDarkTheme}>
                        Dark
                    </Button>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleClose}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AccessabilityModal;