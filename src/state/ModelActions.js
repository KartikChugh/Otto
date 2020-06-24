export const ModelActions = Object.freeze({
  SET_KNN_K: "SET_KNN_K",
  SET_KNN_COLS: "SET_KNN_COLUMNS",
  KNN_DONE: "KNN_DONE",
  LINREG_SET_IND_VAR: "LINREG_SET_IND_VAR",
  LINREG_DONE: "LINREG_DONE",
  NLP_DONE: "NLP_DONE",
  RUNNING: "RUNNING",
  // RUN_NLP: "RUN_NLP"
});

export type ModelActionType =
  | {
      type: ModelActions.SET_KNN_K,
      k: Number,
    }
  | {
      type: ModelActions.KNN_DONE,
    }
  | {
      type: ModelActions.SET_KNN_COLUMNS,
      indices: Array<Number>,
    }
  | {
      type: ModelActions.LINREG_SET_IND_VAR,
      linreg_x_name: String,
    }
  | {
      type: ModelActions.LINREG_DONE,
    }
  | {
      type: ModelActions.NLP_DONE,
      datas: Array<any>,
    }
  | {
      type: ModelActions.RUNNING,
    };
// | {
//     type: ModelActions.RUN_NLP,
//     doEntity: Boolean,
//     doSentiment: Boolean,
// }
