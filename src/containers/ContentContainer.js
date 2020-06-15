import React from "react";
import { Col } from "react-bootstrap";
import RightColumnContainer from "containers/RightColumnContainer";
import MainColumnContainer from "containers/MainColumnContainer";
import SummaryContainer from "containers/SummaryContainer";
import { NNStateProvider } from "state/NNState";

function ContentContainer() {
  return (
    <>
      <Col className="summaryContainer" lg={2}>
        <SummaryContainer />
      </Col>
      <Col className="mainColumnContainer">
        <NNStateProvider>
          <MainColumnContainer />
        </NNStateProvider>
      </Col>
      <Col className="rightColumnContainer" lg={3}>
        <NNStateProvider>
          <RightColumnContainer />
        </NNStateProvider>
      </Col>
    </>
  );
}

export default ContentContainer;
