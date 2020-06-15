import React from "react";
import { useState } from "state/State";
import { Models } from "state/StateTypes";
import VisualizerNNContainer from "components/VisualizerNNContainer";
import PlotKNN from "components/PlotKNN";
import { NNStateProvider } from "state/NNState";

export default function PlotsContainer() {
  const { state } = useState();
  switch (state.model) {
    case Models.NEURAL_NETWORK_FF:
      return (
        <NNStateProvider>
          <VisualizerNNContainer />
        </NNStateProvider>
      );
    case Models.KNN:
      return <PlotKNN />;
    default:
      return null;
  }
}
