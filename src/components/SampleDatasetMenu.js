import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { useState } from "state/State";
import { Actions } from "state/Actions";
import { SampleDataset, StateType } from "state/StateTypes";
import { datasetMetadata } from "static/datasets/metadata";

const getSampleDatasets = (state: StateType) => {
  const stateTask = state.task;
  const sets = [];
  for (const dataset in datasetMetadata) {
    const entry = datasetMetadata[dataset];
    const entryTask = entry.task;
    if (entryTask === stateTask) {
      sets.unshift(dataset);
    }
  }
  return sets;
};

export default function SampleDatasetMenu() {
  const { state, dispatch } = useState();

  function handleConfirm(dataset) {
    dispatch({
      type: Actions.SET_SAMPLE_DATASET,
      sample_dataset: dataset,
    });
  }

  return (
    <List component="nav">
      {getSampleDatasets(state).map((dataset, index) => (
        <ListItem
          selected={state.sample_dataset === dataset}
          onClick={() => handleConfirm(dataset)}
          key={index}
          button
          style={{
            borderRadius: "8px",
            padding: "0px 4px 0px 8px",
            marginTop: "4px",
          }}
        >
          <ListItemIcon style={{ minWidth: "30px" }}>
            {datasetMetadata[dataset].icon}
          </ListItemIcon>
          <ListItemText primary={datasetMetadata[dataset].title} />
        </ListItem>
      ))}
    </List>
  );
}
