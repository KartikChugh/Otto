import React from "react";

import { useState } from "state/State";
import { codeGen } from "codegen/codeGen";

function CodeContainer() {
  const [state, dispatcher] = useState();

  return (
    <textarea 
    value={codeGen(state)} 
    style={{width:"100%", height:"100%", fontSize: "11px"}}
    />
  );
}

export default CodeContainer;
