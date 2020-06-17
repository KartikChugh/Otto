export const NNActions = Object.freeze({
  SET_SELECTED_LAYER: "SET_SELECTED_LAYER",
  SET_NODES: "SET_NODES",
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
    };
