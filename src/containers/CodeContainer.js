import React from "react";
import { Card, CardContent, Grow } from "@material-ui/core";

import { useState } from "state/State";
import { CodeGen } from "codegen/codeGen";
import { useNNState } from "state/NNState";
import { CopyBlock, CodeBlock, dracula, monokai, monokaiSublime, atomOneLight } from 'react-code-blocks';
import { getActiveStep } from "./SummaryContainer";
import { StepperStateOrder } from "state/StateTypes";

function CodeContainer({ getIsShown }) {
  const { state } = useState();
  const { nn_state } = useNNState();

//   const old =  
//   <textarea
//   value={CodeGen(state, nn_state)}
//   style={{
//     width: "100%",
//     height: "100%",
//     fontSize: "11px",
//     backgroundColor: "#44318111",
//     color: "black",
//     fontFamily: "monospace",
//   }}
// />

const updated = 
<CopyBlock
    text={CodeGen(state, nn_state)}
		language={"python"}
    showLineNumbers={false}
    theme={atomOneLight}
    highlight={""}
		wrapLines
  />

  return (
    <Grow in={getIsShown()}>
    {updated}
  </Grow>
  );
}

export default CodeContainer;
