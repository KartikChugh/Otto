import React from "react";
import { Col } from "react-bootstrap";
import RightColumnContainer from "containers/RightColumnContainer";
import MainColumnContainer from "containers/MainColumnContainer";
import SummaryContainer from "containers/SummaryContainer";

function ContentContainer() {
  return (
    <>
      <Col className="summaryContainer" lg={2}>
        {/* <SummaryContainer /> */}
        <RightColumnContainer />
      </Col>
      <Col className="mainColumnContainer">
        <MainColumnContainer />
      </Col>
      <Col className="rightColumnContainer" lg={3}></Col>
    </>
  );
}

export default ContentContainer;
