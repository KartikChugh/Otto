import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useState } from "state/State";

const useStyles = makeStyles((theme) => ({
  rootExplanation: {
    width: "100%",
    textAlign: "center",
    paddingTop: theme.spacing(1),
    boxShadow: "none",
    height: 100,
  },
  rootActions: {
    width: "800%",
    textAlign: "center",
    paddingTop: theme.spacing(1),
    marginTop: theme.spacing(-44),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 42,
    fontWeight: 300,
    marginTop: -5,
  },
  titleInner: {
    fontSize: 38,
    fontWeight: 300,
  },
  subtitle: {
    fontWeight: 300,
  },
}));

function VisualizerContainer() {
  const classes = useStyles();
  const [state, dispatcher] = useState();

  return (
    <>
      <Card className={classes.rootExplanation}>
        <CardContent>
          <Typography className={classes.title} color="primary">
            Build a machine learning pipeline with Otto
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.rootActions} raised={true}>
        <CardContent>
          <Typography className={classes.titleInner} color="textPrimary">
            Let's get started!
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            Chat with Otto to get a {state.stepper_state} recommendation.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default VisualizerContainer;
