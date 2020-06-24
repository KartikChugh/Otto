import React from "react";
import { Grow } from "@material-ui/core";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useState } from "state/State";
import { CodeGen } from "codegen/codeGen";
import { useNNState } from "state/NNState";

function CodeContainer({ getIsShown }) {
  const { state } = useState();
  const { nn_state } = useNNState();

  return (
    <Grow in={getIsShown()}>
      <div className="codeOverflow">
        <SyntaxHighlighter language="python" style={monokaiSublime}>
          {CodeGen(state, nn_state)}
        </SyntaxHighlighter>
      </div>
    </Grow>
  );
}

export default CodeContainer;
