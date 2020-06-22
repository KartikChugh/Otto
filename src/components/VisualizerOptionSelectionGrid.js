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
import SampleDatasetMenu from "components/SampleDatasetMenu";
import { datasetMetadata } from "static/datasets/metadata";
// import logo from "otto_logo_2.png";
import algo from "art/algorithm.svg";
import clas from "art/class.svg";
import reg from "art/reg.svg";
import nlp from "art/nlp.svg"
import custom from "art/custom.svg"
import sample from "art/sample.svg"
import linear from "art/linear.svg"
import ordinal from "art/ordinal.svg"
import poisson from "art/poisson.svg"
import knn from "art/knn.svg"
import network from "art/network.svg"
import sentiment from "art/sentiment.svg"
import entity from "art/entity.svg"
import norm from "art/norm.svg"
import pca from "art/pca.svg"
import clean from "art/clean.svg"


function logoPicker(label) {
  const map = {
    [Tasks.REGRESSION]: reg,
    [Tasks.CLASSIFICATION]: clas,
    [Tasks.NATURAL_LANGUAGE]: nlp,
    [DatasetCategory.CUSTOM]: custom,
    [DatasetCategory.SAMPLE]: sample,
    [Models.LINEAR_REGRESSION]: linear,
    [Models.POISSON_REGRESSION]: poisson,
    [Models.ORDINAL_REGRESSION]: ordinal,
    [Models.KNN]: knn,
    [Models.NEURAL_NETWORK_FF]: network,
    [Models.SENTIMENT_ANALYSIS]: sentiment,
    [Models.ENTITY_RECOGNITION]: entity,
    [Preprocessors.PCA]: pca,
    [Preprocessors.TEXT_CLEANING]: clean,
    [Preprocessors.NORMALIZATION]: norm,
  }
  return map?.[label] ?? algo;
}

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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event, type, label) => {
    if (type === StepperState.DATASET && label === DatasetCategory.SAMPLE) {
      setAnchorEl(event.currentTarget);
    }
  };

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

  function formatLabel(label) {
    if (label === DatasetCategory.SAMPLE) {
      if (state.sample_dataset != null) {
        return label + " (" + datasetMetadata[state.sample_dataset].title + ")";
      }
    }
    return label;
  }

  function AvatarItem(props: { avatar: any }) {
    const avatar = props.avatar;
    return (
      <>
        <Avatar
          aria-controls={avatar.label}
          alt={avatar.label}
          src={logoPicker(avatar.label)}
          className={
            getIsSelected(avatar.label)
              ? classes.avatarItemSelected
              : classes.large
          }
          key={avatar.label}
          onClick={(event) => {
            optionOnClickHandler(avatar.type, avatar.label);
            handleClick(event, avatar.type, avatar.label);
          }}
          aria-haspopup="true"
        />
        <SampleDatasetMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
          id={avatar.label}
        />
      </>
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
        {getOptions(state).map((avatar, index) => (
          <Grid item className={classes.avatarItem} key={index}>
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
              {formatLabel(avatar.label)}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
