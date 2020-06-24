import React from "react";
import { Grow } from "@material-ui/core";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useState } from "state/State";
import { CodeGen } from "codegen/codeGen";
import { useNNState } from "state/NNState";
import { useModelState } from "state/ModelState";

function CodeContainer({ getIsShown }) {
  const { state } = useState();
  const { nn_state } = useNNState();
  const {model_state} = useModelState();

  return (
    <Grow in={getIsShown()}>
      <div
        className={state.stepper_finish ? "codeOverflowFinish" : "codeOverflow"}
      >
        <SyntaxHighlighter language="python" style={monokaiSublime}>
          {CodeGen(state, nn_state, model_state)}
        </SyntaxHighlighter>
      </div>
    </Grow>
  );
}

export default CodeContainer;
