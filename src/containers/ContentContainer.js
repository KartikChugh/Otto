import React from "react";
import { Col } from "react-bootstrap";
import RightColumnContainer from "containers/RightColumnContainer";
import MainColumnContainer from "containers/MainColumnContainer";
import SummaryContainer from "containers/SummaryContainer";
import { Divider } from "@material-ui/core";

function ContentContainer() {
  return (
    <>
      <Col className="summaryContainer" lg={2}>
        <SummaryContainer />
      </Col>
      {/* <Divider orientation="vertical" flexItem /> */}
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
