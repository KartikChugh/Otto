export const ModelActions = Object.freeze({
  SET_KNN_K: "SET_KNN_K",
  SET_KNN_COLS: "SET_KNN_COLUMNS",
  RUN_KNN: "RUN_KNN",
  KNN_DONE: "KNN_DONE",
  RUN_NLP: "RUN_NLP"
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
    }
  | {
      type: ModelActions.SET_KNN_COLUMNS,
      indices: Array<Number>,
    }
  | {
      type: ModelActions.RUN_NLP,
      doEntity: Boolean,
      doSentiment: Boolean,
  }
