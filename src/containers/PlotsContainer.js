import React from "react";
import { useState } from "state/State";
import { Models, Tasks } from "state/StateTypes";
import VisualizerNNContainer from "components/VisualizerNNContainer";
import PlotKNN from "components/PlotKNN";
import PlotLinReg from "components/PlotLinReg";
import PlotNLP from "components/PlotNLP";
import { Satellite } from "@material-ui/icons";

export default function PlotsContainer() {
  const { state } = useState();
  if (state.task === Tasks.NATURAL_LANGUAGE) {
    return <PlotNLP />;
  }
  switch (state.model) {
    case Models.NEURAL_NETWORK_FF:
      return <VisualizerNNContainer />;
    case Models.KNN:
      return <PlotKNN />;
    case Models.LINEAR_REGRESSION:
      return <PlotLinReg />;
    default:
      return null;
  }
}
