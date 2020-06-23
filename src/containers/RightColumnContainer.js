import React from "react";
import "App.css";
import { Row } from "react-bootstrap";
import ToolboxContainer from "containers/ToolboxContainer.react";
import { useState } from "state/State";
import { StepperState, DatasetCategory } from "state/StateTypes";

function RightColumnContainer() {
  const { state } = useState();
  const getIsToolboxShown = () =>
    state.stepper_state === StepperState.VISUALIZE;
  return (
    <Row className="toolboxContainer">
      <ToolboxContainer getIsShown={getIsToolboxShown} />
    </Row>
  );
}

export default RightColumnContainer;
