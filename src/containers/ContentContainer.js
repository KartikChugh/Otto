import React from 'react';
import { Col } from 'react-bootstrap';
import RightColumnContainer from 'containers/RightColumnContainer';
import MainColumnContainer from 'containers/MainColumnContainer';


function ContentContainer() {
    return (
        <>
            <Col className='outerContainer summaryContainer' lg={2}><div>summary</div></Col>
            <Col className='outerContainer mainColumnContainer'>
                <MainColumnContainer />
            </Col>
            <Col className='outerContainer rightColumnContainer' lg={3}>
                <RightColumnContainer />
            </Col>
        </>
    );
}

export default ContentContainer;
