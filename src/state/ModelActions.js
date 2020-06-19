export const ModelActions = Object.freeze({
  SET_KNN_K: "SET_KNN_K",
  RUN_KNN: "RUN_KNN",
  KNN_DONE: "KNN_DONE",
});

export type ModelActionType =
  | {
      type: ModelActions.SET_KNN_K,
      k: Number,
    }
  | {
      type: ModelActions.RUN_KK,
    }
  | {
      type: ModelActions.KNN_DONE,
    };
