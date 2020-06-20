import {
  Optimizers,
  Losses,
  Activations,
  Initializers,
} from "nn-architecture/hyperparams";

export const NNActions = Object.freeze({
  SET_SELECTED_LAYER: "SET_SELECTED_LAYER",
  SET_NODES: "SET_NODES",
  REMOVE_LAYER: "REMOVE_LAYER",
  ADD_LAYER: "ADD_LAYER",
  RESET: "RESET",
  SET_HIDDEN_ACTIVATIONS: "SET_HIDDEN_ACTIVATIONS",
  SET_ALL_INITIALIZERS: "SET_INITIALIZERS",
  SET_HIDDEN_NODES: "SET_HIDDEN_NODES",
  SET_HIDDEN_LAYERS: "SET_HIDDEN_LAYERS",
  ADD_LAYERS: "ADD_LAYERS",
  REMOVE_LAYERS: "REMOVE_LAYERS"
});

export type NNActionType =
  | {
      type: NNActions.SET_SELECTED_LAYER,
      layer: Number,
    }
  | {
      type: NNActions.SET_NODES,
      layer: Number,
      nodes: Number,
    }
  | {
      type: NNActions.REMOVE_LAYER,
      layer: Number,
    }
  | {
      type: NNActions.ADD_LAYER,
    }
  | {
      type: NNActions.RESET,
    }
  | {
      type: NNActions.SET_HIDDEN_ACTIVATIONS,
      activation: String,
    }
  | {
      type: NNActions.SET_INITIALIZERS,
      initializer: String,
    }
  | {
      type: NNActions.SET_HIDDEN_NODES,
      nodes: Number,
  }
  | {
    type: NNActions.SET_HIDDEN_LAYERS,
      layers: Number,
  }
  | {
    type: NNActions.ADD_LAYERS,
    layers: Number,
  }
  | {
    type: NNActions.REMOVE_LAYERS,
    layers: Number,
    fromEnd: Boolean,
  }
