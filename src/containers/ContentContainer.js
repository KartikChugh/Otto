import React from "react";
import { Col } from "react-bootstrap";
import RightColumnContainer from "containers/RightColumnContainer";
import MainColumnContainer from "containers/MainColumnContainer";
import SummaryContainer from "containers/SummaryContainer";

function ContentContainer() {
  return (
    <>
      <Col className="outerContainer summaryContainer" lg={2}>
        <SummaryContainer />
      </Col>
      <Col className="outerContainer mainColumnContainer">
        <MainColumnContainer />
      </Col>
      <Col className="outerContainer rightColumnContainer" lg={3}>
        <RightColumnContainer />
      </Col>
    </>
  );
}

export default ContentContainer;
