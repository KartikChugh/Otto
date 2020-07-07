import React from "react";
import { useEffect } from "react";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ValueLabelDisplay from "components/toolbox/ValueLabelDisplay";
import { Layer } from "nn-architecture/Layer";
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
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { useState } from "state/State";
import { StepperState, StateType, Models } from "state/StateTypes";
import { useNNState } from "state/NNState";
import { NNActions } from "state/NNActions";
import NNFFBuildPanelDetails from "./NNFFBuildPanelDetails";
import { useStyles } from "styles/NNFFToolboxStyles";

const tabLabels = ["Build", "Learn", "Train"];

export default function NNFFToolbox() {
  const classes = useStyles();
  const { state, dispatch } = useState();
  const { nn_state } = useNNState();
  return (
    <div className={classes.root}>
      <Grid container className={classes.header} direction="row">
        <Grid item>
          <Typography variant="h6" className={classes.floatRight}>
            Layer {nn_state.selectedLayerIndex + 1} of {nn_state.layers.length}
          </Typography>
          <NNFFBuildPanelDetails />
        </Grid>
      </Grid>
    </div>
  );
}
