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
import VisualizerOptionSelectionGrid from "components/VisualizerOptionSelectionGrid";
import { getOptions } from "components/VisualizerOptionSelectionGrid";
import { getActiveStep, getSteps } from "containers/SummaryContainer";
import { StepperState, Models, Tasks, DatasetCategory } from "state/StateTypes";
import { Actions } from "state/Actions";
import PlotsContainer from "./PlotsContainer";
import { useModelState } from "state/ModelState";
import { ModelActions } from "state/ModelActions";

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
  const steps = getSteps();
  const { state, dispatch } = useState();
  const { model_dispatch } = useModelState();

  const getIsSelected = (value) =>
    [
      state.task,
      state.dataset_category,
      state.sample_dataset,
      state.model,
      ...state.nlp_models,
      ...state.preprocessors,
    ].includes(value);

  const handleNext = () => {
    if (state.stepper_state === StepperState.PREPROCESSORS) {
      if (state.model === Models.KNN) {
        model_dispatch({
          type: ModelActions.RUN_KNN,
          dispatch: model_dispatch,
        });
      } else if (state.task === Tasks.NATURAL_LANGUAGE) {
        model_dispatch({
          type: ModelActions.RUN_NLP,
          dispatch: model_dispatch,
        });
      }
    }
    dispatch({
      type: Actions.STEPPER_HANDLE_NEXT,
    });
  };

  const handleBack = () => {
    dispatch({
      type: Actions.STEPPER_HANDLE_PREVIOUS,
    });
  };

  const handleFinish = () => {
    dispatch({
      type: Actions.HANDLE_STEPPER_FINISH,
    });
  };

  function isNextDisabled() {
    if (
      state.stepper_state === StepperState.DATASET &&
      state.dataset_category === DatasetCategory.SAMPLE &&
      state.sample_dataset == null
    ) {
      return true;
    }
    return (
      state.stepper_state !== StepperState.PREPROCESSORS &&
      !getOptions(state).some((val) => getIsSelected(val.label))
    );
  }

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
          <CardContent className={classes.fullHeight}>
            {state.stepper_state === StepperState.VISUALIZE ? (
              <PlotsContainer />
            ) : (
              <VisualizerOptionSelectionGrid />
            )}
          </CardContent>
          <CardActions
            style={{
              position: "absolute",
              bottom: "2px",
              display: "inline-block",
              width: "100%",
              left: 0,
            }}
          >
            {getActiveStep(state) > 0 ? (
              <Button
                onClick={handleBack}
                className={classes.button}
                style={{ float: "left" }}
                startIcon={<NavigateBeforeRounded />}
              >
                {steps[getActiveStep(state) - 1]}
              </Button>
            ) : null}
            <Button
              disabled={isNextDisabled()}
              variant="contained"
              color="primary"
              onClick={
                getActiveStep(state) === steps.length - 1
                  ? handleFinish
                  : handleNext
              }
              className={classes.button}
              style={{ float: "right" }}
              endIcon={<NavigateNextRounded />}
            >
              {getActiveStep(state) === steps.length - 1
                ? "Finish"
                : steps[getActiveStep(state) + 1]}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default VisualizerContainer;
