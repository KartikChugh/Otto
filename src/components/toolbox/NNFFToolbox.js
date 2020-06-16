import React from "react";
import { useEffect } from "react";

import { Layer } from "nn-architecture/Layer";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  Tabs,
  Tab,
  Box,
  AppBar,
  useTheme,
  Grid,
  Button,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import NumericInput from "react-numeric-input";
import { useState } from "state/State";
import { StepperState, StateType, Models } from "state/StateTypes";
import { useNNState } from "state/NNState";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  tab: {
    outline: "none !important",
    // minWidth: "33%",
  },
  layerInputItem: {
    marginBottom: 8,
  },
  layerInput: {
    width: 60,
    height: 36,
    borderRadius: "4px !important",
    textAlign: "center",
  },
  button: {
    minWidth: "32px !important",
    width: 36,
    outline: "none",
  },
}));

const tabLabels = ["Build", "Learn", "Train"];

function LayerOption({ layer }) {
  const classes = useStyles();
  return (
    <Grid className={classes.layerInputItem} item>
      <Grid container direction="row">
        <Grid item>
          <Button
            className={classes.button}
            disableElevation
            variant="contained"
            color="primary"
          >
            <RemoveIcon />
          </Button>
        </Grid>
        <Grid item>
          <NumericInput
            className={classes.layerInput}
            min={1}
            max={10}
            value={layer.units}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default function NNFFToolbox() {
  const classes = useStyles();
  const { state, dispatch } = useState();
  const { nn_state, nn_dispatch } = useNNState();
  return (
    <div className={classes.root}>
      Build
      <Grid container direction="column">
        {nn_state.layers.map((layer) => (
          <LayerOption layer={layer} />
        ))}
        <LayerOption layer={{ units: 0 }} />
      </Grid>
    </div>
  );
}
