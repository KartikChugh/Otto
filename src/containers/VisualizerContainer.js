import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

import { useState } from "state/State";
import VisualizerOptionSelectionGrid from "components/VisualizerOptionSelectionGrid";
import VisualizerNNContainer from "components/VisualizerNNContainer";
import { Models } from "state/StateTypes";

const useStyles = makeStyles((theme) => ({
  rootExplanation: {
    width: "100%",
    textAlign: "center",
    paddingTop: theme.spacing(1),
    boxShadow: "none",
    height: 100,
  },
  rootActions: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    paddingTop: theme.spacing(1),
    position: "relative",
  },
  title: {
    fontSize: "2vw",
    fontWeight: 300,
    marginTop: -5,
  },
  fullWidth: {
    width: "100%",
  },
  fullHeight: {
    height: "100%",
  },
  visualizerHeight: {
    height: "calc(100% - 100px)",
  },
}));

function VisualizerContainer() {
  const classes = useStyles();
  const [state, dispatcher] = useState();

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      className={classes.fullHeight}
    >
      <Grid item className={classes.fullWidth}>
        <Card className={classes.rootExplanation}>
          <CardContent>
            <Typography className={classes.title} color="primary">
              Build a machine learning pipeline with Otto
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid className={`${classes.fullWidth} ${classes.visualizerHeight}`} item>
        <Card className={classes.rootActions} variant="outlined">
          {state.stepper_finish && state.model === Models.NEURAL_NETWORK_FF ? (
            <VisualizerNNContainer />
          ) : (
            <VisualizerOptionSelectionGrid />
          )}
        </Card>
      </Grid>
    </Grid>
  );
}

export default VisualizerContainer;
