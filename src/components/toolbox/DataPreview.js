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
  Paper,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

import { SampleDataset, StateType } from "state/StateTypes";
import { datasetMetadata } from "static/datasets/metadata";
import { useState } from "state/State";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    // padding: theme.spacing(0.5),
    // marginTop: -12,
    border: "none",
    width: "100%",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  table: {
    width: "97%",
    margin: 12,
  },
  noPadding: {
    padding: 0,
  },
  fullWidth: {
    width: "100%",
  },
}));

const chipData = (state: StateType) => {
  const metadata = datasetMetadata[state.sample_dataset];
  const chips = ["Instances: " + String(metadata.instances)];
  if (metadata.attributes) {
    chips.push("Attributes: " + String(metadata.attributes));
  }
  if (metadata.classes) {
    chips.push("Classes: " + String(metadata.classes));
  }
  chips.push(...metadata.tags);
  return chips;
};

export default function DataPreview() {
  const { state } = useState();
  const classes = useStyles();

  if (state.sample_dataset == null) {
    return null;
  }
  const metadata = datasetMetadata[state.sample_dataset];
  console.log("meta", metadata);
  function getFormatted(label, index) {
    if (metadata.units) {
      return label + " (" + metadata.units[index] + ")";
    }
    return label;
  }

  return (
    <ExpansionPanel defaultExpanded>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">
          {datasetMetadata[state.sample_dataset].title}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.noPadding}>
        <Grid direction="column" container className={classes.noPadding}>
          {/* Data Attributes */}
          <Grid item>
            <div className={classes.root}>
              {chipData(state).map((data, index) => {
                return (
                  <li key={index}>
                    <Chip
                      label={data}
                      color="primary"
                      className={classes.chip}
                    />
                  </li>
                );
              })}
            </div>
          </Grid>
          {/* Table */}
          <Grid item className={classes.fullWidth}>
            <TableContainer component={Paper} className={classes.table}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    {metadata.columns.map((column, index) => (
                      <TableCell>
                        {getFormatted(
                          metadata.columnsMap
                            ? metadata.columnsMap[column]
                            : column,
                          index
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {metadata.data.slice(0, 5).map((row, index) => (
                    <TableRow key={index}>
                      {metadata.columns.map((column) => (
                        <TableCell component="th" scope="row">
                          {row[column]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
