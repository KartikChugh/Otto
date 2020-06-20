import React from "react";

import { useState } from "state/State";
import { CodeGen } from "codegen/codeGen";
import { useNNState } from "state/NNState";

function CodeContainer() {
  const { state } = useState();
  const { nn_state } = useNNState();

  return (
    <textarea
      value={CodeGen(state, nn_state)}
      style={{ width: "100%", height: "100%", fontSize: "11px" }}
    />
  );
}

export default CodeContainer;
