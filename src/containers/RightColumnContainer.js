import React from "react";
import "App.css";
import { Row } from "react-bootstrap";
import ToolboxContainer from "containers/ToolboxContainer.react";
import { useNNState } from "state/NNState";

function RightColumnContainer() {
  const { nn_state } = useNNState();
  console.log("rerere?", nn_state);
  return (
    <Row className="toolboxContainer">
      <ToolboxContainer />
    </Row>
  );
}

export default RightColumnContainer;
