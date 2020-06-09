import React from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid, Avatar, Badge, Tooltip } from "@material-ui/core";

import logo from "logo.svg";

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

const StyledBadge = withStyles((theme) => ({
  badge: {
    // backgroundColor: "#44b700",
    // color: "#44b700",
    width: 10,
    // boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      // animation: "$ripple 1.2s infinite ease-in-out",
      // border: "1px solid currentColor",
      content: '""',
    },
  },
  // "@keyframes ripple": {
  //   "0%": {
  //     transform: "scale(.8)",
  //     opacity: 1,
  //   },
  //   "100%": {
  //     transform: "scale(2.4)",
  //     opacity: 0,
  //   },
  // },
}))(Badge);

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
  recommend: {
    width: 30,
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
        })
      );
      return options;
    case StepperState.DATASET:
      Object.keys(DatasetCategory).map((key) =>
        options.push({
          label: DatasetCategory[key],
          type: StepperState.DATASET,
        })
      );
      return options;
    case StepperState.MODEL:
      Object.keys(TaskToModelsMap(state.task)).map((key) =>
        options.push({
          label: Models[key],
          type: StepperState.MODEL,
        })
      );
      console.log("when model", options);
      return options;
    default:
      return options;
  }
}

function VisualizerContainer() {
  const classes = useStyles();
  const [state, dispatcher] = useState();
  const getIsSelected = (value) =>
    [
      state.task,
      state.dataset_category,
      state.sample_dataset,
      state.model,
    ].includes(value);

  const getIsRecommended = (value) =>
    [
      state.task_otto,
      state.dataset_category_otto,
      state.sample_dataset_otto,
      state.model_otto,
    ].includes(value);

  function AvatarItem(props: { avatar: any }) {
    const avatar = props.avatar;
    return (
      <Avatar
        alt={avatar.label}
        src={logo}
        className={
          getIsSelected(avatar.label)
            ? classes.avatarItemSelected
            : classes.large
        }
        onClick={() => optionOnClickHandler(avatar.type, avatar.label)}
      />
    );
  }

  const optionOnClickHandler = (type: StepperStateType, value) => {
    switch (type) {
      case StepperState.TASK:
        dispatcher({
          type: Actions.SET_TASK,
          task: value,
        });
        dispatcher({
          type: Actions.SET_TASK_OTTO,
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
                {getIsRecommended(avatar.label) ? (
                  <Tooltip title="Recommended by Otto!" placement="top">
                    <StyledBadge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      badgeContent={
                        <img
                          className={classes.recommend}
                          src="https://img.icons8.com/ultraviolet/80/000000/good-quality.png"
                          alt="R"
                        />
                      }
                    >
                      <AvatarItem avatar={avatar} />
                    </StyledBadge>
                  </Tooltip>
                ) : (
                  <AvatarItem avatar={avatar} />
                )}
                <Typography
                  color="textPrimary"
                  className={
                    getIsSelected(avatar.label)
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
