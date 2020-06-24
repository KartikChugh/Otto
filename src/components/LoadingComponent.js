import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";

export default function LoadingComponent() {
  return (
    <>
      <CircularProgress color="secondary" style={{ marginTop: "60px" }} />
      <Typography style={{ marginTop: "12px" }}>
        Crunching numbers...
      </Typography>
    </>
  );
}
