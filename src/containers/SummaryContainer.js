import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Card } from "@material-ui/core";
import { useState } from "state/State";
import { StepperStateOrder, StateType } from "state/StateTypes";
import { Actions } from "state/Actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginLeft: 90,
  },
  stepLabel: {
    fontSize: 19,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  headerText: {
    paddingLeft: theme.spacing(0),
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(1),
    fontWeight: "600",
  },
  card: {
    marginTop: "4px",
  },
  optionLabel: {
    marginLeft: 12,
    borderLeft: "1px solid #bdbdbd",
    paddingLeft: 12,
    height: 32,
    paddingTop: 4,
  },
}));

export function getSteps() {
  return ["Task", "Dataset", "Model", "Preprocessors", "Visualize"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Identify the machine learning task matching your goal";
    case 1:
      return "Choose from provided datasets or use your own";
    case 2:
      return "Select the model best equipped to unlock insights from your data";
    case 3:
      return "Optimize your data for machine learning";
    case 4:
      return "Fine tune and visualize your model";
    default:
      return "OttoML";
  }
}

export const getActiveStep = (state: StateType) =>
  state.stepper_finish
    ? StepperStateOrder.length
    : StepperStateOrder.indexOf(state.stepper_state);

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const { state, dispatch } = useState();
  const steps = getSteps();

  const SelectedOptionLabel = (props: { index: number }) => {
    let option = null;
    switch (props.index) {
      case 0:
        option = state.task;
        break;
      case 1:
        option = state.dataset_category;
        break;
      case 2:
        option = state.model;
        break;
      case 3:
        option = state.preprocessors.join(", ");
        break;
      default:
        break;
    }
    if (option == null || getActiveStep(state) <= props.index) {
      return null;
    }
    return <Typography className={classes.optionLabel}>{option}</Typography>;
  };

  const handleReset = () => {
    dispatch({
      type: Actions.HANDLE_RESET,
    });
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.headerText} variant="h5">
        Pipeline Architecture
      </Typography>
      <Card className={classes.card} variant="outlined">
        <Stepper activeStep={getActiveStep(state)} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>
                {<Typography variant="h6">{label}</Typography>}
              </StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
              </StepContent>
              <SelectedOptionLabel index={index} />
            </Step>
          ))}
        </Stepper>
      </Card>
      {getActiveStep(state) === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
