import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { Avatar } from "@material-ui/core";

import { useState } from "state/State";
import {
  StepperStateType,
  StepperState,
  Tasks,
  TasksType,
  Models,
  DatasetCategory,
  TaskToModelsMap,
  StateType,
} from "state/StateTypes";
import { Actions } from "state/Actions";

const useStyles = makeStyles((theme) => ({
  rootExplanation: {
    width: "100%",
    textAlign: "center",
    paddingTop: theme.spacing(1),
    boxShadow: "none",
    height: 100,
  },
  rootActions: {
    width: "800%",
    textAlign: "center",
    paddingTop: theme.spacing(1),
    marginTop: theme.spacing(-40),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 42,
    fontWeight: 300,
    marginTop: -5,
  },
  titleInner: {
    fontSize: 42,
    fontWeight: 300,
    marginTop: 8,
  },
  subtitle: {
    marginTop: 20,
    marginBottom: 72,
    fontWeight: 300,
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
  avatarItem: {
    textAlign: "-webkit-center",
    width: 188,
  },
  avatarItemSelected: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    boxShadow:
      "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 0px 6px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
    border: "solid 1px #3f51b5",
  },
  avatarLabel: {},
  avatarLabelSelected: {
    fontWeight: 500,
  },
}));

function getOptions(state: StateType) {
  const options = [];
  const stepperState = state.stepper_state;
  switch (stepperState) {
    case StepperState.TASK:
      Object.keys(Tasks).map((key) =>
        options.push({
          label: Tasks[key],
          type: StepperState.TASK,
          value: key,
        })
      );
      return options;
    case StepperState.DATASET:
      Object.keys(DatasetCategory).map((key) =>
        options.push({
          label: DatasetCategory[key],
          type: StepperState.DATASET,
          value: key,
        })
      );
      return options;
    case StepperState.MODEL:
      Object.keys(TaskToModelsMap(state.task)).map((key) =>
        options.push({
          label: Models[key],
          type: StepperState.MODEL,
          value: key,
        })
      );
      return options;
    default:
      return options;
  }
}

function VisualizerContainer() {
  const classes = useStyles();
  const [state, dispatcher] = useState();
  const getIsSelected = (value) =>
    [state.task, state.dataset_category, state.model].includes(value);

  const optionOnClickHandler = (type: StepperStateType, value) => {
    switch (type) {
      case StepperState.TASK:
        dispatcher({
          type: Actions.SET_TASK,
          task: value,
        });
        break;
      case StepperState.DATASET:
        dispatcher({
          type: Actions.SET_DATASET_CATEGORY,
          dataset_category: value,
        });
        break;
      case StepperState.MODEL:
        dispatcher({
          type: Actions.SET_MODEL,
          model: value,
        });
        break;
      default:
    }
  };

  return (
    <>
      <Card className={classes.rootExplanation}>
        <CardContent>
          <Typography className={classes.title} color="primary">
            Build a machine learning pipeline with Otto
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.rootActions} raised={true}>
        <CardContent>
          <Typography className={classes.titleInner} color="textPrimary">
            Let's get started!
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            Chat with Otto to get a {state.stepper_state} recommendation.
          </Typography>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={5}
          >
            {getOptions(state).map((avatar) => (
              <Grid item className={classes.avatarItem} key={avatar.label}>
                <Avatar
                  alt={avatar.label}
                  src="/static/images/avatar/1.jpg"
                  className={
                    getIsSelected(avatar.value)
                      ? classes.avatarItemSelected
                      : classes.large
                  }
                  onClick={() =>
                    optionOnClickHandler(avatar.type, avatar.value)
                  }
                />
                <Typography
                  color="textPrimary"
                  className={
                    getIsSelected(avatar.value)
                      ? classes.avatarLabelSelected
                      : classes.avatarLabel
                  }
                >
                  {avatar.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default VisualizerContainer;
