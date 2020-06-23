import React from "react";
import { Card, CardContent, Grow } from "@material-ui/core";

import { useState } from "state/State";
import { CodeGen } from "codegen/codeGen";
import { useNNState } from "state/NNState";
import { getActiveStep } from "./SummaryContainer";
import { StepperStateOrder } from "state/StateTypes";

function CodeContainer({ getIsShown }) {
  const { state } = useState();
  const { nn_state } = useNNState();

  return (
    <Grow in={getIsShown()}>
      <textarea
        value={CodeGen(state, nn_state)}
        style={{
          width: "100%",
          height: "100%",
          fontSize: "11px",
          backgroundColor: "#44318111",
          color: "black",
          fontFamily: "monospace",
        }}
      />
    </Grow>
  );
}

export default CodeContainer;
