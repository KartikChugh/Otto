import React from "react";
import "App.css";
import { Row } from "react-bootstrap";
import ToolboxContainer from "containers/ToolboxContainer.react";

function RightColumnContainer() {
  return (
    <>
      <Row className="toolboxContainer">
        <ToolboxContainer />
      </Row>
    </>
  );
}

export default RightColumnContainer;
