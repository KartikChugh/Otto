import React from "react";
import "App.css";
import { Row } from "react-bootstrap";
import VisualizerContainer from "containers/VisualizerContainer";

function MainColumnContainer() {
  return (
    <>
      <Row className="visualizerContainer">
        <VisualizerContainer />
      </Row>
      <Row className="outerContainer codeContainer">Output Code</Row>
    </>
  );
}

export default MainColumnContainer;
