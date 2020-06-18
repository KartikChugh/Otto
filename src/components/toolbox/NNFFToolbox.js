import React from "react";
import { useEffect } from "react";

import ValueLabelDisplay from "components/toolbox/ValueLabelDisplay";
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
    width: 260,
  },
  sliderWidth: {
    width: 200,
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
  nodesLabel: {
    marginRight: 8,
  },
  nodesItem: {
    marginTop: 24,
    marginBottom: -8,
  },
  actionItem: {
    marginTop: 16,
  },
  button: {
    width: 260,
    marginBottom: 8,
    outline: "none !important",
  },
}));

const tabLabels = ["Build", "Learn", "Train"];

const onNodesChanged = (layerIndex, units, nn_dispatch) => {
  nn_dispatch({
    type: NNActions.SET_NODES,
    layer: layerIndex,
    nodes: units,
  });
};

const onLayerRemove = (layerIndex, nn_dispatch) => {
  nn_dispatch({
    type: NNActions.REMOVE_LAYER,
    layer: layerIndex,
  });
};

const onLayerAdd = (nn_dispatch) => {
  nn_dispatch({
    type: NNActions.ADD_LAYER,
  });
};

function LayerOption({ layer, layerIndex, nn_dispatch }) {
  const classes = useStyles();
  if (layer == null) {
    return null;
  }
  return (
    <Grid className={classes.layerInputItem} item>
      <Typography variant="h6">Layer {layerIndex + 1}</Typography>
      <Grid item>
        <Grid direction="row" className={classes.nodesItem} container>
          <Grid item>
            <Typography className={classes.nodesLabel} gutterBottom>
              Nodes
            </Typography>
          </Grid>
          <Grid className={classes.sliderWidth} item>
            <Slider
              value={layer.units}
              valueLabelDisplay="on"
              ValueLabelComponent={ValueLabelDisplay}
              step={1}
              marks
              min={1}
              max={10}
              onChange={(event, units) =>
                onNodesChanged(layerIndex, units, nn_dispatch)
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.actionItem}>
        <FormControl className={classes.actionWidth}>
          <InputLabel id="demo-simple-select-label">
            Activation Function1
          </InputLabel>
          <Select value={10} onChange={null}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item className={classes.actionItem}>
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
        <Grid className={classes.actionItem} item>
          <Button
            disabled={nn_state.layers.length === 1}
            color="secondary"
            className={classes.button}
            variant="outlined"
            onClick={() =>
              onLayerRemove(nn_state.selectedLayerIndex, nn_dispatch)
            }
          >
            Remove layer {nn_state.selectedLayerIndex + 1}
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            className={classes.button}
            variant="outlined"
            onClick={() => onLayerAdd(nn_dispatch)}
          >
            Add Layer
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
