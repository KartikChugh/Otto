import React from "react";

import ValueLabelDisplay from "components/toolbox/ValueLabelDisplay";
import { Layer } from "nn-architecture/Layer";
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
  Typography,
  Slider,
} from "@material-ui/core";
import { useStyles } from "styles/NNFFToolboxStyles";
import { NNActions } from "state/NNActions";
import { useNNState } from "state/NNState";

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
      {/* <Grid style={{ "margin-top": "28px" }} item>
          <Divider />
        </Grid> */}
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

export default function NNFFBuildPanelDetails() {
  const classes = useStyles();
  const { nn_state, nn_dispatch } = useNNState();

  return (
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
  );
}
