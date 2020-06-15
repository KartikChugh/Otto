import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Card, Grow } from "@material-ui/core";
import { useState } from "state/State";
import { StepperState, StateType, Models } from "state/StateTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    // marginLeft: 110,
  },
  headerText: {
    paddingLeft: theme.spacing(0),
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(1),
    fontWeight: "600",
  },
  card: {
    marginTop: "4px",
    height: "100%",
  },
}));

const getToolboxContent = (state: StateType) => {
  switch (state.model) {
    case Models.LINEAR_REGRESSION:
      return <div>TODO</div>;
    case Models.NEURAL_NETWORK_FF:
      return <div>Also TODO</div>;
    default:
      return <div>Same</div>;
  }
};

export default function ToolboxContainer() {
  const classes = useStyles();
  const { state, dispatch } = useState();
  return (
    <Grow in={state.stepper_state === StepperState.VISUALIZE}>
      <div className={classes.root}>
        <Typography className={classes.headerText} variant="h5">
          Toolbox
        </Typography>
        <Card className={classes.card} variant="outlined">
          {getToolboxContent(state)}
        </Card>
      </div>
    </Grow>
  );
}
