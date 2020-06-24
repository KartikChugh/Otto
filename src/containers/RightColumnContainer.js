import React from "react";
import "App.css";
import { Row } from "react-bootstrap";
import ToolboxContainer from "containers/ToolboxContainer.react";
import { useState } from "state/State";
import { StepperState, Tasks } from "state/StateTypes";

function RightColumnContainer() {
  const { state } = useState();
  const getIsToolboxShown = () =>
    state.stepper_state === StepperState.VISUALIZE &&
    state.task !== Tasks.NATURAL_LANGUAGE &&
    !state.stepper_finish;
  return (
    <Row className="toolboxContainer">
      <ToolboxContainer getIsShown={getIsToolboxShown} />
    </Row>
  );
}

export default RightColumnContainer;
