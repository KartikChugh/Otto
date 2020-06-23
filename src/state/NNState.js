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
import PlotsContainer from "containers/PlotsContainer";

const InitialState = () => ({
  layers: [
    new Layer(3, Activations.LINEAR),
    new Layer(6),
    new Layer(5),
    new Layer(6),
    new Layer(5),
    new Layer(2, Activations.SOFTMAX),
  ],
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
    case NNActions.SET_LAYER_ACTIVATION: {
      const layers = [...state.layers];
      layers[action.layer].activation = action.activation;
      return {
        ...state,
        layers,
      };
    }
    case NNActions.SET_LAYER_INITIALIZER: {
      const layers = [...state.layers];
      layers[action.layer].initializer = action.initializer;
      return {
        ...state,
        layers,
      };
    }

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
      let selectedLayerIndex = state.selectedLayerIndex;
      if (layers.length > 2) {
        layers.splice(action.layer, 1);
        if (selectedLayerIndex > 0) {
          selectedLayerIndex -= 1;
        }
      }
      return {
        ...state,
        layers,
        selectedLayerIndex,
      };
    }
    case NNActions.ADD_LAYER: {
      const layers = [...state.layers];

      const lastHiddenLayer = layers?.[layers.length - 2];
      const lastHiddenSize = lastHiddenLayer?.units ?? 5;
      const newLayer = new Layer(lastHiddenSize);
      layers.splice(layers.length - 1, 0, newLayer);

      return {
        ...state,
        layers,
        selectedLayerIndex: layers.length - 2, // FIXME: this can be incorrect in edge cases?
      };
    }

    case NNActions.RESET: {
      return initialState;
    }
    case NNActions.SET_HIDDEN_ACTIVATIONS: {
      const newActivation = action.activation;
      const layers = [...state.layers];
      for (let i = 1; i < layers.length - 1; i++) {
        const layer = layers[i];
        layer.activation = newActivation;
      }
      return {
        ...state,
        layers,
      };
    }
    case NNActions.SET_ALL_INITIALIZERS: {
      const newInitializer = action.initializer;
      const layers = [...state.layers];
      for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        layer.initializer = newInitializer;
      }
      return {
        ...state,
        layers,
      };
    }
    case NNActions.SET_HIDDEN_NODES: {
      const count = action.nodes;
      const layers = [...state.layers];
      for (let i = 1; i < layers.length - 1; i++) {
        const layer = layers[i];
        layer.units = count;
      }
      return {
        ...state,
        layers,
      };
    }
    case NNActions.SET_HIDDEN_LAYERS: {
      const layerCount = action.layers;
      const currentLayers = [...state.layers];
      const inputLayer = currentLayers[0];
      const outputLayer = currentLayers[currentLayers.length - 1];

      const activation = inputLayer.activation;
      const initializer = inputLayer.initializer;
      const nodeCountA = currentLayers?.[1]?.units ?? 5;
      const nodeCountB = currentLayers?.[2]?.units ?? 3;
      const newLayers = [];
      newLayers.push(inputLayer);
      for (let i = 0; i < layerCount; i++) {
        const nodes = i % 2 ? nodeCountA : nodeCountB;
        const newLayer = new Layer(nodes, activation, initializer);
        newLayers.push(newLayer);
      }
      newLayers.push(outputLayer);
      return {
        ...state,
        layers: newLayers,
      };
    }

    case NNActions.ADD_LAYERS: {
      const count = action.layers;
      const layers = [...state.layers];

      const activation = layers[0].activation;
      const initializer = layers[0].initializer;
      const nodeCountA = layers?.[layers.length - 3]?.units ?? 5;
      const nodeCountB = layers?.[layers.length - 2]?.units ?? 3;

      const outputLayer = layers.pop();

      for (let i = 0; i < count; i++) {
        const layer = new Layer(
          i % 2 ? nodeCountB : nodeCountA,
          activation,
          initializer
        );
        layers.push(layer);
      }
      layers.push(outputLayer);
      return {
        ...state,
        layers: layers,
      };
    }

    case NNActions.REMOVE_LAYERS: {
      const fromEnd = action.fromEnd;
      const count = action.layers;
      let layers = [...state.layers];
      const inputLayer = layers.shift();
      const outputLayer = layers.pop();

      if (fromEnd) layers.reverse();
      for (let i = 0; i < count; i++) {
        layers.shift();
      }
      layers = [inputLayer, ...layers, outputLayer];
      return {
        ...state,
        layers: layers,
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
