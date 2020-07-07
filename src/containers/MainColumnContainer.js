import React from "react";
import "App.css";
import VisualizerContainer from "containers/VisualizerContainer";
import CodeContainer from "containers/CodeContainer";
import { Grid } from "@material-ui/core";
import ToolboxContainer from "./ToolboxContainer.react";
import { useState } from "state/State";
import { StepperState, DatasetCategory } from "state/StateTypes";
import { getActiveStep } from "./SummaryContainer";

function MainColumnContainer() {
  const { state } = useState();
  const getIsCodeShown = () =>
    getActiveStep(state) > 1 && !state.stepper_finish;
  const getIsToolboxShown = () =>
    state.stepper_state === StepperState.DATASET &&
    state.dataset_category === DatasetCategory.SAMPLE &&
    state.sample_dataset != null;
  return (
    <Grid container style={{ height: "100%" }}>
      <Grid
        item
        className={
          state.stepper_finish ? "finishContainer" : "visualizerContainer"
        }
      >
        <VisualizerContainer />
      </Grid>
      {!state.stepper_finish && (
        <Grid item className="codeContainer">
          {getIsCodeShown() ? (
            <CodeContainer getIsShown={getIsCodeShown} />
          ) : null}
          {getIsToolboxShown() ? (
            <ToolboxContainer getIsShown={getIsToolboxShown} />
          ) : null}
        </Grid>
      )}
    </Grid>
  );
}

export default MainColumnContainer;
