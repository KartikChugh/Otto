import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Avatar,
  Badge,
  Tooltip,
  Typography,
  IconButton,
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import CodeContainer from "containers/CodeContainer";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { useState } from "state/State";
import { CodeGen } from "codegen/codeGen";
import { useNNState } from "state/NNState";
import { useModelState } from "state/ModelState";

const useStyles = makeStyles((theme) => ({
  titleInner: {
    fontSize: 36,
    fontWeight: 300,
    marginBottom: 8,
  },
}));

export default function StepperFinish() {
  const classes = useStyles();
  const { state } = useState();
  const { nn_state } = useNNState();
  const {model_state} = useModelState();
  const [codeCopied, setCodeCopied] = React.useState(false);

  const copyToClipboard = (setCopied = true) => {
    navigator.clipboard.writeText(CodeGen(state, nn_state, model_state));
    setCodeCopied(setCopied);
  };

  const openInCollab = async () => {
    copyToClipboard(true);
    await new Promise((r) => setTimeout(r, 1200));
    window
      .open("https://colab.research.google.com/#create=true", "_blank")
      .focus();
  };

  return (
    <>
      <Typography className={classes.titleInner} color="textPrimary">
        You're all set to continue the journey!
      </Typography>
      <Grid
        direction="row"
        container
        justify="center"
        spacing={2}
        style={{ marginBottom: "8px" }}
      >
        <Grid item>
          <Tooltip
            title={codeCopied ? "Code copied!" : "Copy code"}
            placement="top"
          >
            <IconButton
              onClick={copyToClipboard}
              color="primary"
              component="span"
            >
              {codeCopied ? <AssignmentTurnedInIcon /> : <AssignmentIcon />}
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Launch Google Collab" placement="top">
            <IconButton onClick={openInCollab} color="primary" component="span">
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Reset Otto" placement="top">
            <IconButton
              onClick={() => {
                window.location.reload();
                return false;
              }}
              color="primary"
              component="span"
            >
              <RotateLeftIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <CodeContainer getIsShown={() => true} />
    </>
  );
}
