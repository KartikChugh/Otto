import React from 'react';
import 'App.css';
import { Row } from 'react-bootstrap';

function MainColumnContainer() {
    return (
        <>
            <Row className='outerContainer visualizerContainer'>visualizer component</Row>
            <Row className='outerContainer codeContainer'>Output Code</Row>
        </>
    );
}

export default MainColumnContainer;