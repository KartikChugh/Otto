import React from "react";
import "App.css";
import VisualizerContainer from "containers/VisualizerContainer";
import { Grid } from "@material-ui/core";

function MainColumnContainer() {
  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item className="visualizerContainer">
        <VisualizerContainer />
      </Grid>
      <Grid item className="outerContainer codeContainer">
        Output Code
      </Grid>
    </Grid>
  );
}

export default MainColumnContainer;
