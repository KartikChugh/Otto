import React from "react";
import "App.css";
import { Row } from "react-bootstrap";

function MainColumnContainer() {
  return (
    <>
      <Row className="visualizerContainer">visualizer component</Row>
      <Row className="outerContainer codeContainer">Output Code</Row>
    </>
  );
}

export default MainColumnContainer;
