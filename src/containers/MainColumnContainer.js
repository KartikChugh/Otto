import React from "react";
import "App.css";
import VisualizerContainer from "containers/VisualizerContainer";
import CodeContainer from "containers/CodeContainer";
import { Grid } from "@material-ui/core";
import { useNNState } from "state/NNState";

function MainColumnContainer() {
  const { nn_state } = useNNState();
  console.log("wat");
  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item className="visualizerContainer">
        <VisualizerContainer />
      </Grid>
      <Grid item className="outerContainer codeContainer">
        <CodeContainer />
      </Grid>
    </Grid>
  );
}

export default MainColumnContainer;
