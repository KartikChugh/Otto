import React from "react";
import { useState } from "state/State";
import { Models } from "state/StateTypes";
import VisualizerNNContainer from "components/VisualizerNNContainer";
import PlotKNN from "components/PlotKNN";
import PlotLinReg from "components/PlotLinReg";

export default function PlotsContainer() {
  const { state } = useState();
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
