import React from "react";
import { useReducer, createContext, useContext } from "react";

import { deleteMessages, addResponseMessage } from "react-chat-widget";
import { InitialState, StateType } from "state/StateTypes";
import { ActionType, Actions } from "state/Actions";
import { StepperStateOrder } from "state/StateTypes";

import { initializeWidget } from "containers/WidgetContainer";

// See https://www.basefactor.com/global-state-with-react for details
const initialState = InitialState();

export const StateContext = createContext(initialState);
export const DispatchStateContext = createContext(() => null);
const NumSteps = StepperStateOrder.length;

function reducer(state: StateType, action: ActionType): StateType {
  const getActiveStep = () => {
    return StepperStateOrder.indexOf(state.stepper_state);
  };

  switch (action.type) {
    case Actions.SET_TASK:
      return { ...state, task: action.task };
    case Actions.SET_DATASET_CATEGORY:
      return { ...state, dataset_category: action.dataset_category };
    case Actions.SET_MODEL:
      return { ...state, model: action.model };
    case Actions.SET_SAMPLE_DATASET:
      return { ...state, sample_dataset: action.sample_dataset };
    case Actions.SET_TASK_OTTO:
      return { ...state, task_otto: action.task };
    case Actions.SET_DATASET_CATEGORY_OTTO:
      return { ...state, dataset_category_otto: action.dataset_category };
    case Actions.SET_MODEL_OTTO:
      return { ...state, model_otto: action.model };
    case Actions.SET_SAMPLE_DATASET_OTTO:
      return { ...state, sample_dataset_otto: action.sample_dataset };
    case Actions.TOGGLE_PREPROCESSOR: {
      let currentPreprocessors = state.preprocessors;
      if (currentPreprocessors.includes(action.preprocessor)) {
        currentPreprocessors = currentPreprocessors.filter(
          (val) => val !== action.preprocessor
        );
      } else {
        currentPreprocessors.push(action.preprocessor);
      }
      return {
        ...state,
        preprocessors: currentPreprocessors,
      };
    }
    case Actions.TOGGLE_PREPROCESSOR_OTTO: {
      let currentPreprocessors = state.preprocessors_otto;
      if (currentPreprocessors.includes(action.preprocessor)) {
        currentPreprocessors = currentPreprocessors.filter(
          (val) => val !== action.preprocessor
        );
      } else {
        currentPreprocessors = currentPreprocessors.push(action.preprocessor);
      }
      return {
        ...state,
        preprocessors_otto: currentPreprocessors,
      };
    }
    case Actions.STEPPER_HANDLE_NEXT:
      return {
        ...state,
        stepper_state:
          NumSteps === getActiveStep()
            ? NumSteps
            : StepperStateOrder[getActiveStep() + 1],
      };
    case Actions.STEPPER_HANDLE_PREVIOUS:
      return {
        ...state,
        stepper_state:
          StepperStateOrder[StepperStateOrder.indexOf(state.stepper_state) - 1],
        stepper_finish: false,
      };
    case Actions.HANDLE_STEPPER_FINISH:
      return {
        ...state,
        stepper_finish: true,
      };
    case Actions.HANDLE_RESET:
      initializeWidget();
      return InitialState();
    default:
      return state;
  }
}

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchStateContext.Provider value={dispatch}>
        {children}
      </DispatchStateContext.Provider>
    </StateContext.Provider>
  );
};

export const useState = () => ({
  state: useContext(StateContext),
  dispatch: useContext(DispatchStateContext),
});
