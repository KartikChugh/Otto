// For all models other than NN

import React from "react";
import { useReducer, createContext, useContext } from "react";

import { ModelActionType, ModelActions } from "state/ModelActions";
import { invoke } from "js-ml/knn";
import { invokeNLP } from "js-ml/nlp"
import { Models } from "./StateTypes";

const InitialState = () => ({
  knn_k: 5,
  knn_labels: [], // string labels
  knn_result_labels: [], // label indexes
  knn_expected_labels: [],
  knn_test_data: [],
  knn_columns: [],
  knn_columns_map: {},
  knn_column_units: [],
  knn_column1_index: 2,
  knn_column2_index: 1,

  viz_loading: false,
});

const initialState = InitialState();
const ModelStateContext = createContext(initialState);
const DispatchModelStateContext = createContext(() => null);

function reducer(state, action: ModelActionType) {
  switch (action.type) {
    case ModelActions.SET_KNN_K:
      return {
        ...state,
        knn_k: action.k,
      };
    case ModelActions.SET_KNN_COLS:
      return {
        ...state,
        knn_column1_index: action.indices[0],
        knn_column2_index: action.indices[1],
      };
    case ModelActions.RUN_KNN:
      invoke(state.knn_k, action.dispatch);
      return { ...state, viz_loading: true };
    case ModelActions.KNN_DONE:
      return {
        ...state,
        viz_loading: false,
        knn_result_labels: action.knn_result_labels,
        knn_expected_labels: action.knn_expected_labels,
        knn_test_data: action.knn_test_data,
        knn_columns: action.knn_columns,
        knn_columns_map: action.knn_columns_map,
        knn_column_units: action.knn_column_units,
        knn_labels: action.knn_labels,
      };
    case ModelActions.RUN_NLP:
      invokeNLP(action.doEntity, action.doSentiment);
      return { ...state, viz_loading: true };
    default:
      return state;
  }
}

export const ModelStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ModelStateContext.Provider value={state}>
      <DispatchModelStateContext.Provider value={dispatch}>
        {children}
      </DispatchModelStateContext.Provider>
    </ModelStateContext.Provider>
  );
};

export const useModelState = () => ({
  model_state: useContext(ModelStateContext),
  model_dispatch: useContext(DispatchModelStateContext),
});
