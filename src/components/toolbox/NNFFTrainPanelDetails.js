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

export default function () {
  const { nn_state, nn_dispatch } = useNNState();
  return null;
}
