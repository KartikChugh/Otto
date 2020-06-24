import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Card, CardContent, Grow } from "@material-ui/core";
import { useState } from "state/State";
import {
  StepperState,
  StateType,
  Models,
  DatasetCategory,
} from "state/StateTypes";
import NNFFToolbox from "components/toolbox/NNFFToolbox";
import KNNToolbox from "components/toolbox/KNNToolbox";
import DataPreview from "components/toolbox/DataPreview";
import LinRegToolbox from "components/toolbox/LinRegToolbox";
import { datasetMetadata } from "static/datasets/metadata";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 296,
  },
  dataRoot: {
    width: "96%",
  },
  headerText: {
    paddingLeft: theme.spacing(0),
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(1),
    fontWeight: "600",
  },
  dataHeaderText: {
    paddingLeft: theme.spacing(0),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    fontWeight: "600",
  },
  card: {
    marginTop: "4px",
    height: "100%",
    border: "none",
  },
  cardContent: {
    padding: 2,
  },
}));

const getToolboxContent = (state: StateType) => {
  if (state.stepper_state === StepperState.VISUALIZE) {
    switch (state.model) {
      case Models.LINEAR_REGRESSION:
        return <LinRegToolbox />;
      case Models.NEURAL_NETWORK_FF:
        return <NNFFToolbox />;
      case Models.KNN:
        return <KNNToolbox />;
      default:
        return null;
    }
  }
  if (state.stepper_state === StepperState.DATASET) {
    return <DataPreview />;
  }
  return null;
};

export default function ToolboxContainer({ getIsShown }) {
  const classes = useStyles();
  const { state } = useState();
  return (
    <Grow in={getIsShown()}>
      <div
        className={
          state.stepper_state === StepperState.VISUALIZE
            ? classes.root
            : classes.dataRoot
        }
      >
        <Typography
          className={
            state.stepper_state === StepperState.VISUALIZE
              ? classes.headerText
              : classes.dataHeaderText
          }
          variant="h5"
        >
          {state.stepper_state === StepperState.VISUALIZE
            ? "Toolbox"
            : state.stepper_state === StepperState.DATASET &&
              state.sample_dataset_view != null
            ? "Dataset Preview - " +
              datasetMetadata[state.sample_dataset_view].title
            : null}
        </Typography>
        <Card className={classes.card} variant="outlined">
          <CardContent className={classes.cardContent}>
            {getToolboxContent(state)}
          </CardContent>
        </Card>
      </div>
    </Grow>
  );
}
