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
import { StepperStateOrder } from "state/StateTypes";
import { Actions } from "state/Actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    alignContent: "centre",
  },
  less: {
    width: "60%",
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
  return ["Task", "Dataset", "Model", "Preprocessors"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Identify the machine learning task that describes your goal";
    case 1:
      return "Choose from provided datasets, or use your own";
    case 2:
      return "Select the model best equipped to unlock insights from your data";
    case 3:
      return "Optimize your data for machine learning";
    default:
      return "Unknown step";
  }
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [state, dispatch] = useState();
  const steps = getSteps();

  const getActiveStep = () => {
    return state.stepper_finish
      ? StepperStateOrder.length
      : StepperStateOrder.indexOf(state.stepper_state);
  };

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
        option = "";
        break;
      default:
        break;
    }
    if (option == null || getActiveStep() <= props.index) {
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
        <Stepper activeStep={getActiveStep()} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
              </StepContent>
              <SelectedOptionLabel index={index} />
            </Step>
          ))}
        </Stepper>
      </Card>
      {getActiveStep() === steps.length && (
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
