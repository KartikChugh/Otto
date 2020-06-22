import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { useState } from "state/State";
import { Actions } from "state/Actions";
import { SampleDataset, StateType } from "state/StateTypes";
import { datasetMetadata } from "static/datasets/metadata";

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
  },
  buttonInner: {
    width: "100%",
    outline: "none!important",
  },
  //   subtext: {
  //     color: "white",
  //   },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary, & .MuiListItemText-secondary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

// TODO: Conditionally return datasets
const getSampleDatasets = (state: StateType) => {
  return [SampleDataset.IRIS, SampleDataset.BOSTON, SampleDataset.TWITTER];
};

export default function SampleDatasetMenu({ anchorEl, handleClose, id }) {
  const { state, dispatch } = useState();
  const classes = useStyles();
  let style, selectedDataset;
  if (anchorEl != null) {
    const rect = anchorEl.getBoundingClientRect();
    style = {
      transform: `translate(${rect.left - 80}px, ${
        rect.top + rect.height + 40
      }px)`,
    };
  }

  function handleItemClick(dataset) {
    selectedDataset = dataset;
  }

  function handleConfirm() {
    handleClose();
    if (selectedDataset != null) {
      dispatch({
        type: Actions.SET_SAMPLE_DATASET,
        sample_dataset: selectedDataset,
      });
    }
  }

  return (
    <StyledMenu
      id={id}
      keepMounted
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      style={style}
    >
      {getSampleDatasets(state).map((dataset, index) => (
        <StyledMenuItem
          selected={state.sample_dataset === dataset}
          onClick={() => handleItemClick(dataset)}
          key={index}
        >
          <ListItemIcon>{datasetMetadata[dataset].icon}</ListItemIcon>
          <ListItemText
            primary={datasetMetadata[dataset].title}
            secondary={datasetMetadata[dataset].subtitle}
          />
        </StyledMenuItem>
      ))}
      <div className={classes.button}>
        <Button
          color="primary"
          variant="outlined"
          className={classes.buttonInner}
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </div>
    </StyledMenu>
  );
}
