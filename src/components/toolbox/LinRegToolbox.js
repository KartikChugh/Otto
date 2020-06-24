import React from "react";

import ValueLabelDisplay from "components/toolbox/ValueLabelDisplay";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Grid,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Card,
} from "@material-ui/core";

import { ModelActionType, ModelActions } from "state/ModelActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { useModelState } from "state/ModelState";
import { useState } from "state/State";
import { model } from "codegen/knnCode";
import { invokeLinReg } from "js-ml/linReg";

export const useStyles = makeStyles((theme) => ({
  sliderWidth: {
    width: 200,
  },
  nodesLabel: {
    marginRight: 8,
  },
  nodesItem: {
    marginTop: 0,
    marginBottom: 8,
  },
  actionItem: {
    marginBottom: 16,
  },
  actionWidth: {
    width: 260,
  },
  button: {
    width: 260,
    marginBottom: 8,
    outline: "none !important",
  },
}));

export default function LinRegToolbox() {
  const classes = useStyles();
  const { state } = useState();
  const { model_state, model_dispatch } = useModelState();
  const [indVar, setIndVar] = React.useState(model_state.linreg_x_name);

  React.useEffect(() => {
    setIndVar(model_state.linreg_x_name);
  }, [model_state.linreg_x_name]);

  function shouldRetrain() {
    return model_state.linreg_x_name !== indVar;
  }

  function onUpdatePlot() {
    model_dispatch({
      type: ModelActions.LINREG_SET_IND_VAR,
      linreg_x_name: indVar,
    });
    invokeLinReg(model_dispatch, state.sample_dataset, indVar, false);
  }

  return (
    <Card style={{ border: "none", boxShadow: "none" }}>
      <Grid direction="column" container>
        {/* Column 1 */}
        <Grid item className={classes.actionItem}>
          <FormControl className={classes.actionWidth}>
            <InputLabel id="demo-simple-select-label">
              Independant Variable
            </InputLabel>
            <Select
              value={indVar !== "" ? indVar : ""}
              onChange={(event) => setIndVar(event.target.value)}
            >
              {model_state.linreg_columns.map((column, index) => (
                <MenuItem key={index} value={column}>
                  {column}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            className={classes.button}
            variant="outlined"
            onClick={onUpdatePlot}
            disabled={!shouldRetrain()}
          >
            {"Re-Train Model"}
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
