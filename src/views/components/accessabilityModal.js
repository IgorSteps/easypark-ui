import {Button, Modal} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

const defaultFontSize = 18;

function AccessabilityModal({show, handleClose}) {
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
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleClose}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AccessabilityModal;