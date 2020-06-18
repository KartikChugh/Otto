export const NNActions = Object.freeze({
  SET_SELECTED_LAYER: "SET_SELECTED_LAYER",
  SET_NODES: "SET_NODES",
  REMOVE_LAYER: "REMOVE_LAYER",
  ADD_LAYER: "ADD_LAYER",
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
    };
