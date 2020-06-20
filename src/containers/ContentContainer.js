import React from "react";
import { Col } from "react-bootstrap";
import RightColumnContainer from "containers/RightColumnContainer";
import MainColumnContainer from "containers/MainColumnContainer";
import SummaryContainer from "containers/SummaryContainer";

function ContentContainer() {
  return (
    <>
      <Col className="summaryContainer" lg={2}>
        <SummaryContainer />
      </Col>
      <Col className="mainColumnContainer">
        <MainColumnContainer />
      </Col>
      <Col className="rightColumnContainer" lg={3}>
        <RightColumnContainer />
      </Col>
    </>
  );
}

export default ContentContainer;
