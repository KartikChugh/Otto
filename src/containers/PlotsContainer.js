import React from "react";
import { useState } from "state/State";
import { Models } from "state/StateTypes";
import VisualizerNNContainer from "components/VisualizerNNContainer";
import PlotKNN from "components/PlotKNN";

export default function PlotsContainer() {
  const [state, dispatcher] = useState();
  switch (state.model) {
    case Models.NEURAL_NETWORK_FF:
      return <VisualizerNNContainer />;
    case Models.KNN:
      return <PlotKNN />;
    default:
      return null;
  }
}
