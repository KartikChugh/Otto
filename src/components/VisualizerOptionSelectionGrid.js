import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Badge, Tooltip, Typography } from "@material-ui/core";

import { invoke } from "js-ml/knn";

import {
  StepperStateType,
  StepperState,
  Tasks,
  Models,
  DatasetCategory,
  TaskToModelsMap,
  StateType,
  Preprocessors,
} from "state/StateTypes";
import { useState } from "state/State";
import { Actions } from "state/Actions";
import logo from "logo.svg";

const StyledBadge = withStyles((theme) => ({
  badge: {
    width: 10,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      content: '""',
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
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
  avatarLabel: {
    marginTop: 20,
  },
  avatarLabelSelected: {
    marginTop: 20,
    fontWeight: 500,
  },
  recommend: {
    width: 30,
  },
  button: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

export function getOptions(state: StateType) {
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
      return options;
    case StepperState.PREPROCESSORS:
      Object.keys(Preprocessors).map((key) =>
        options.push({
          label: Preprocessors[key],
          type: StepperState.PREPROCESSORS,
        })
      );
      return options;
    default:
      return options;
  }
}

export default function VisualizerOptionSelectionGrid() {
  const classes = useStyles();
  const { state, dispatch } = useState();

  const getIsRecommended = (value) =>
    [
      state.task_otto,
      state.dataset_category_otto,
      state.sample_dataset_otto,
      state.model_otto,
      ...state.nlp_models_otto,
      ...state.preprocessors_otto,
    ].includes(value);

  const getIsSelected = (value) =>
    [
      state.task,
      state.dataset_category,
      state.sample_dataset,
      state.model,
      ...state.nlp_models,
      ...state.preprocessors,
    ].includes(value);

  const optionOnClickHandler = (type: StepperStateType, value) => {
    switch (type) {
      case StepperState.TASK:
        dispatch({
          type: Actions.SET_TASK,
          task: value,
        });
        break;
      case StepperState.DATASET:
        dispatch({
          type: Actions.SET_DATASET_CATEGORY,
          dataset_category: value,
        });
        break;
      case StepperState.MODEL:
        if (state.task === Tasks.NATURAL_LANGUAGE) {
          dispatch({
            type: Actions.TOGGLE_NLP_MODEL,
            model: value,
          });
        } else {
          dispatch({
            type: Actions.SET_MODEL,
            model: value,
          });
        }
        break;
      case StepperState.PREPROCESSORS:
        dispatch({
          type: Actions.TOGGLE_PREPROCESSOR,
          preprocessor: value,
        });
        break;
      default:
    }
  };

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

  return (
    <>
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
    </>
  );
}
