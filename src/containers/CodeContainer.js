import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  CardContent,
  CardActions,
  Typography,
  Card,
  Button,
} from "@material-ui/core";
import {
  NavigateNextRounded,
  NavigateBeforeRounded,
} from "@material-ui/icons/";

import { useState } from "state/State";
import { getOptions } from "components/VisualizerOptionSelectionGrid";
import { getActiveStep, getSteps } from "containers/SummaryContainer";
import { StepperState } from "state/StateTypes";
import { Actions } from "state/Actions";
import PlotsContainer from "./PlotsContainer";
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
