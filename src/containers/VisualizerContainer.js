import React from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  CardContent,
  CardActions,
  Typography,
  Card,
  Button,
  Breadcrumbs,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import {
  NavigateNextRounded,
  NavigateBeforeRounded,
  NavigateNext,
  ArrowBack,
  ArrowForward,
} from "@material-ui/icons/";

import { useState } from "state/State";
import VisualizerOptionSelectionGrid from "components/VisualizerOptionSelectionGrid";
import { getOptions } from "components/VisualizerOptionSelectionGrid";
import { getActiveStep, getSteps } from "containers/SummaryContainer";
import {
  StepperState,
  Models,
  Tasks,
  DatasetCategory,
  StepperStateOrder,
} from "state/StateTypes";
import { Actions } from "state/Actions";
import PlotsContainer from "./PlotsContainer";
import { useModelState } from "state/ModelState";
import { invokeNLP } from "js-ml/nlp";
import { invokeKNN } from "js-ml/knn";
import { invokeLinReg } from "js-ml/linReg";

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
    border: "none",
    boxShadow: "none",
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
    height: "calc(100% - 92px)",
  },
  // next and back buttons
  button: {
    transition: "all 0.4s",
    border: "1px solid rgba(14,19,24,.2)",
    outline: "none !important",
    "&:hover": {
      backgroundColor: "white",
      boxShadow: "0 0 0 2px #00c4cc, inset 0 0 0 2px #ffffff",
      borderColor: "white",
    },
  },
  buttonDisabled: {
    border: "1px solid white",
    outline: "none !important",
  },
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    margin: "0px 28px 0px 28px",
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundImage: "linear-gradient(to right, #00c3cc, #7c2ae8)",
  },
}))(LinearProgress);

function VisualizerContainer() {
  const classes = useStyles();
  const steps = getSteps();
  const { state, dispatch } = useState();
  const { model_dispatch } = useModelState();

  function getProgressBarValue() {
    return (100 * (getActiveStep(state) + 1)) / StepperStateOrder.length;
  }

  const getIsSelected = (value) =>
    [
      state.task,
      state.dataset_category,
      state.sample_dataset,
      state.model,
      ...state.nlp_models,
      ...state.preprocessors,
    ].includes(value);

  const handleNext = async () => {
    dispatch({
      type: Actions.STEPPER_HANDLE_NEXT,
    });
    if (state.stepper_state === StepperState.PREPROCESSORS) {
      if (state.model === Models.KNN) {
        invokeKNN(state.knn_k, model_dispatch);
      } else if (state.task === Tasks.NATURAL_LANGUAGE) {
        await invokeNLP(
          state.nlp_models.includes(Models.ENTITY_RECOGNITION),
          state.nlp_models.includes(Models.SENTIMENT_ANALYSIS),
          model_dispatch
        );
      } else if (state.model === Models.LINEAR_REGRESSION) {
        invokeLinReg(model_dispatch, null, true);
      }
    }
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
      {/* Nav Bar */}
      <Grid
        container
        direction="row"
        style={{
          height: "82px",
          padding: "16px 28px 16px 28px",
          justifyContent: "center",
        }}
      >
        <Grid item style={{ float: "left", width: "50px" }}>
          {getActiveStep(state) > 0 ? (
            <IconButton
              onClick={handleBack}
              className={classes.button}
              style={{ float: "left" }}
              component="span"
            >
              <ArrowBack />
            </IconButton>
          ) : null}
        </Grid>
        <Grid
          item
          style={{ margin: "0 auto", alignSelf: "center", width: "510px" }}
        >
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
          >
            {StepperStateOrder.map((step, index) => {
              if (getActiveStep(state) === index) {
                return (
                  <Typography color="textPrimary" style={{ fontSize: "18px" }}>
                    {String(index + 1) + ". " + getSteps()[index]}
                  </Typography>
                );
              } else if (getActiveStep(state) > index) {
                return (
                  <Typography
                    color="textSecondary"
                    style={{ fontSize: "18px" }}
                  >
                    {getSteps()[index]}
                  </Typography>
                );
              }
              return null;
            })}
          </Breadcrumbs>
        </Grid>
        <Grid item style={{ float: "right" }}>
          <IconButton
            disabled={isNextDisabled()}
            variant="contained"
            onClick={
              getActiveStep(state) === steps.length - 1
                ? handleFinish
                : handleNext
            }
            className={
              isNextDisabled() ? classes.buttonDisabled : classes.button
            }
            style={{ float: "right" }}
          >
            <ArrowForward />
          </IconButton>
        </Grid>
      </Grid>
      {/* Progress Bar */}
      <Grid item style={{ width: "100%" }}>
        <BorderLinearProgress
          variant="determinate"
          value={getProgressBarValue()}
        />
      </Grid>
      <Grid className={`${classes.fullWidth} ${classes.visualizerHeight}`} item>
        <Card className={classes.rootActions}>
          <CardContent className={classes.fullHeight}>
            {state.stepper_state === StepperState.VISUALIZE ? (
              <PlotsContainer />
            ) : (
              <VisualizerOptionSelectionGrid />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default VisualizerContainer;
