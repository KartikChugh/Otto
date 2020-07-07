import React from "react";
import { Col } from "react-bootstrap";
import RightColumnContainer from "containers/RightColumnContainer";
import MainColumnContainer from "containers/MainColumnContainer";
import SummaryContainer from "containers/SummaryContainer";

function ContentContainer() {
  return (
    <>
      <Col className="summaryContainer" lg={1}>
        {/* <SummaryContainer /> */}
        <RightColumnContainer />
      </Col>
      <Col className="mainColumnContainer" lg={6}>
        <MainColumnContainer />
      </Col>
      <Col className="rightColumnContainer" lg={1}></Col>
    </>
  );
}

export default ContentContainer;
