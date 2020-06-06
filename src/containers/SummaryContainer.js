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
}));

function getSteps() {
  return ["Task", "Dataset", "Model"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
    case 1:
      return "An ad group contains one or more ads which target a shared set of keywords.";
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
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

  const handleNext = () => {
    console.log(
      "calling dispath??",
      state.stepper_state,
      getActiveStep(),
      StepperStateOrder,
      StepperStateOrder.indexOf(state.stepper_state)
    );
    dispatch({
      type: Actions.STEPPER_HANDLE_NEXT,
    });
  };

  const handleBack = () => {
    dispatch({
      type: Actions.STEPPER_HANDLE_PREVIOUS,
    });
  };

  const handleReset = () => {
    dispatch({
      type: Actions.HANDLE_RESET,
    });
  };

  const handleFinish = () => {
    dispatch({
      type: Actions.HANDLE_STEPPER_FINISH,
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
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={getActiveStep() === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={
                        getActiveStep() === steps.length - 1
                          ? handleFinish
                          : handleNext
                      }
                      className={classes.button}
                    >
                      {getActiveStep() === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
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
