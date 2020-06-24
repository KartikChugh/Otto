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
  SatelliteSharp,
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
  Preprocessors,
} from "state/StateTypes";
import { Actions } from "state/Actions";
import PlotsContainer from "./PlotsContainer";
import { useModelState } from "state/ModelState";
import { invokeNLP } from "js-ml/nlp";
import { invokeKNN } from "js-ml/knn";
import { invokeLinReg } from "js-ml/linReg";
import { datasetMetadata } from "static/datasets/metadata";
import StepperFinish from "components/StepperFinish";

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
    maxHeight: 640,
    textAlign: "center",
    paddingTop: theme.spacing(1),
    position: "relative",
    border: "none",
    boxShadow: "none",
  },
  rootActionsFinish: {
    width: "100%",
    height: "100%",
    maxHeight: 900,
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
  rightMargin: { marginRight: 24 },
  visualizerHeight: {
    height: "calc(100% - 92px)",
  },
  // next and back buttons
  button: {
    transition: "all 0.4s",
    border: "1px solid rgba(14,19,24,.2)",
    outline: "none !important",
    // backgroundColor: "blue",
    "&:hover": {
      backgroundColor: "white",
      boxShadow: "0 0 0 2px #00c4cc, inset 0 0 0 2px #ffffff",
      borderColor: "white",
    },
  },
  nextButton: {
    transition: "all 0.4s",
    border: "1px solid rgba(14,19,24,.2)",
    outline: "none !important",
    backgroundImage: "linear-gradient(45deg, #7b2be8, #3284d7)",
    "&:hover": {
      backgroundColor: "white",
      boxShadow: "0 0 0 2px #00c4cc, inset 0 0 0 2px #ffffff",
      borderColor: "white",
    },
  },
  nextButtonDisabled: {
    border: "1px solid white",
    outline: "none !important",
    backgroundColor: "white",
    transition: "all 0.4s",
  },
  arrow: {
    color: "white",
  },
}));

const taskFormatter = (task) =>
  task === Tasks.NATURAL_LANGUAGE ? "NLP" : task;

const datasetFormatter = (category, sample) => {
  if (category === DatasetCategory.CUSTOM) {
    return category;
  }
  return category + " (" + sample + ")";
};

const modelFormatter = (model) => {
  switch (model) {
    case Models.KNN:
      return "KNN";
    case Models.NEURAL_NETWORK_FF:
      return "Neural Net";
    case Models.LINEAR_REGRESSION:
      return "Linear Reg.";
    case Models.ORDINAL_REGRESSION:
      return "Ordinal Reg.";
    case Models.POISSON_REGRESSION:
      return "Poisson Reg.";
    default:
      return null;
  }
};

const nlpModelFormatter = (models) => {
  if (models.length === 1) {
    return models;
  }
  const newModels = models.map((model) => {
    if (model === Models.ENTITY_RECOGNITION) {
      return "Entity Recog.";
    }
    if (model === Models.SENTIMENT_ANALYSIS) {
      return "Sentiment";
    }
  });
  return newModels;
};

const preprocessorFormatter = (preprocessors) => {
  if (preprocessors.length === 1) {
    return preprocessors;
  }
  const newPre = preprocessors.map((pre) => {
    switch (pre) {
      case Preprocessors.TEXT_CLEANING:
        return "Text Clean";
      case Preprocessors.NORMALIZATION:
        return "Normalize";
      case Preprocessors.PCA:
        return "PCA";
      default:
        return null;
    }
  });
  return newPre;
};

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
  const { model_state, model_dispatch } = useModelState();

  function getProgressBarValue() {
    if (state.stepper_finish) {
      return 200;
    }
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
      model_state,
      model_dispatch,
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
    if (state.stepper_state === StepperState.VISUALIZE) {
      return false;
    }
    return (
      state.stepper_state !== StepperState.PREPROCESSORS &&
      !getOptions(state).some((val) => getIsSelected(val.label))
    );
  }

  const SelectedOptionLabel = (index) => {
    let option = null;
    switch (index) {
      case 0:
        option = taskFormatter(state.task);
        break;
      case 1:
        option = datasetFormatter(state.dataset_category, state.sample_dataset);
        break;
      case 2:
        if (state.task === Tasks.NATURAL_LANGUAGE) {
          option = nlpModelFormatter(state.nlp_models).join(", ");
        } else {
          option = modelFormatter(state.model);
        }
        break;
      case 3:
        option = preprocessorFormatter(state.preprocessors).join(", ");
        break;
      case 4:
        option = "Visualize";
        break;
      default:
        break;
    }
    return option;
  };

  function getVizContent() {
    if (state.stepper_finish) {
      return <StepperFinish />;
    }
    if (state.stepper_state === StepperState.VISUALIZE) {
      return <PlotsContainer />;
    }
    return <VisualizerOptionSelectionGrid />;
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
          style={{
            margin: "0 auto",
            alignSelf: "center",
            width: `${state.stepper_finish ? "130px" : "540px"}`,
          }}
        >
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
          >
            {StepperStateOrder.map((step, index) => {
              if (getActiveStep(state) === index && !state.stepper_finish) {
                return (
                  <Typography color="textPrimary" style={{ fontSize: "18px" }}>
                    {String(index + 1) + ". " + getSteps()[index]}
                  </Typography>
                );
              } else if (
                getActiveStep(state) > index &&
                !state.stepper_finish
              ) {
                return (
                  <Typography
                    color="textSecondary"
                    style={{ fontSize: "18px" }}
                  >
                    {SelectedOptionLabel(index)}
                  </Typography>
                );
              }
              return null;
            })}
            {state.stepper_finish && (
              <Typography color="textPrimary" style={{ fontSize: "18px" }}>
                Code Gen!
              </Typography>
            )}
            }
          </Breadcrumbs>
        </Grid>
        <Grid item style={{ float: "right" }}>
          {!state.stepper_finish && (
            <IconButton
              disabled={isNextDisabled()}
              variant="contained"
              onClick={
                getActiveStep(state) === steps.length - 1
                  ? handleFinish
                  : handleNext
              }
              className={
                isNextDisabled()
                  ? classes.nextButtonDisabled
                  : classes.nextButton
              }
              style={{ float: "right" }}
            >
              <ArrowForward
                className={
                  isNextDisabled() ? classes.arrowDisabled : classes.arrow
                }
              />
            </IconButton>
          )}
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
        <Card
          className={
            state.stepper_finish
              ? classes.rootActionsFinish
              : classes.rootActions
          }
        >
          <CardContent
            className={`${classes.fullHeight} ${
              state.stepper_state === StepperState.VISUALIZE
                ? classes.rightMargin
                : null
            }`}
          >
            {getVizContent()}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default VisualizerContainer;
