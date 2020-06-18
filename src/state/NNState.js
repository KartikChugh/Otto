import React from "react";
import { useReducer, createContext, useContext } from "react";

import {
  Optimizers,
  Losses,
  Activations,
  Initializers,
} from "nn-architecture/hyperparams";
import { Layer } from "nn-architecture/Layer";
import { NNActionType, NNActions } from "state/NNActions";

const InitialState = () => ({
  layers: [
    new Layer(3),
    new Layer(5),
    new Layer(5),
    new Layer(5),
    new Layer(5),
    new Layer(2),
  ],
  activation: Activations.RELU,
  outputActivation: Activations.SOFTMAX,
  initializer: Initializers.GLOROT,
  optimizer: Optimizers.ADAM,
  loss: Losses.BINARY_CLASS,
  selectedLayerIndex: 0,
});

const initialState = InitialState();
const NNStateContext = createContext(initialState);
const DispatchNNStateContext = createContext(() => null);

function reducer(state, action: NNActionType) {
  switch (action.type) {
    case NNActions.SET_SELECTED_LAYER:
      return {
        ...state,
        selectedLayerIndex: action.layer,
      };
    case NNActions.SET_NODES: {
      const layers = [...state.layers];
      layers[action.layer] = new Layer(action.nodes);
      return {
        ...state,
        layers,
      };
    }
    case NNActions.REMOVE_LAYER: {
      const layers = [...state.layers];
      if (layers.length > 1) {
        layers.splice(action.layer, 1);
      }
      let selectedLayerIndex = state.selectedLayerIndex;
      if (selectedLayerIndex > 0) {
        selectedLayerIndex -= 1;
      }
      return {
        ...state,
        layers,
        selectedLayerIndex,
      };
    }
    case NNActions.ADD_LAYER: {
      const layers = [...state.layers];
      layers.push(new Layer(1));
      return {
        ...state,
        layers,
        selectedLayerIndex: layers.length - 1,
      };
    }
    default:
      return state;
  }
}

export const NNStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <NNStateContext.Provider value={state}>
      <DispatchNNStateContext.Provider value={dispatch}>
        {children}
      </DispatchNNStateContext.Provider>
    </NNStateContext.Provider>
  );
};

export const useNNState = () => ({
  nn_state: useContext(NNStateContext),
  nn_dispatch: useContext(DispatchNNStateContext),
});
