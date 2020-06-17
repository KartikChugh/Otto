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
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import NumericInput from "react-numeric-input";
import { useState } from "state/State";
import { StepperState, StateType, Models } from "state/StateTypes";
import { useNNState } from "state/NNState";
import { Add } from "@material-ui/icons";
import { NNActions } from "state/NNActions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  tab: {
    outline: "none !important",
    // minWidth: "33%",
  },
  actionTitles: {
    marginBottom: 4,
  },
  actionWidth: {
    width: 240,
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

const onNodesChanged = (layerIndex, units, nn_dispatch) => {
  console.log("onNodesChanges", layerIndex, units);
  nn_dispatch({
    type: NNActions.SET_NODES,
    layer: layerIndex,
    nodes: units,
  });
};

function LayerOption({ layer, layerIndex, nn_dispatch }) {
  const classes = useStyles();
  return (
    <Grid className={classes.layerInputItem} item>
      <Typography>Selection: Layer {layerIndex + 1}</Typography>
      <Grid className={classes.actionWidth} item>
        <Typography gutterBottom>Nodes</Typography>
        <Slider
          defaultValue={layer.units}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
          onChange={(event, units) =>
            onNodesChanged(layerIndex, units, nn_dispatch)
          }
        />
      </Grid>
      <Grid item>
        <FormControl className={classes.actionWidth}>
          <InputLabel id="demo-simple-select-label">
            Activation Function
          </InputLabel>
          <Select value={10} onChange={null}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl className={classes.actionWidth}>
          <InputLabel id="demo-simple-select-label">
            Weight Initializer
          </InputLabel>
          <Select value={10} onChange={null}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
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
      <Typography variant="h5" className={classes.actionTitles}>
        Build
      </Typography>
      <Divider />
      <Grid container direction="column">
        <LayerOption
          layer={nn_state.layers[nn_state.selectedLayerIndex]}
          layerIndex={nn_state.selectedLayerIndex}
          nn_dispatch={nn_dispatch}
        />
        <Grid item>
          <Button color="primary" variant="outlined">
            Remove layer {nn_state.selectedLayerIndex + 1}
          </Button>
        </Grid>
        <Grid item>
          <Button color="secondary" variant="outlined">
            Add Layer
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
