import React from "react";
import { useReducer, createContext, useContext } from "react";

import {
  Optimizers,
  Losses,
  Activations,
  Initializers,
} from "nn-architecture/hyperparams";
import { Layer } from "nn-architecture/Layer";
import { ActionType, Actions } from "state/Actions";

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
});

const initialState = InitialState();
const NNStateContext = createContext(initialState);
const DispatchNNStateContext = createContext(() => null);

function reducer(state, action: ActionType) {
  switch (action.type) {
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
