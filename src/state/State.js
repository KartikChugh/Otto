import React from "react";
import { useReducer, createContext, useContext } from "react";

import { deleteMessages, addResponseMessage } from "react-chat-widget";
import {
  InitialState,
  StateType,
  StepperState,
  DatasetCategory,
} from "state/StateTypes";
import { ActionType, Actions } from "state/Actions";
import { StepperStateOrder } from "state/StateTypes";
import { handleNext, handlePrev } from "containers/WidgetContainer";
import { preprocessorsModifier } from "conversation/RespondState";

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
  console.log("sa", state, action);
  switch (action.type) {
    case Actions.SET_TASK:
      return {
        ...state,
        task: action.task,
        // sample_dataset: null,
        // dataset_category: null,
      };
    case Actions.SET_DATASET_CATEGORY: {
      const newState = { ...state, dataset_category: action.dataset_category };
      if (action.dataset_category === DatasetCategory.CUSTOM) {
        newState.sample_dataset = null;
        newState.sample_dataset_view = null;
      }
      return newState;
    }
    case Actions.SET_MODEL:
      return {
        ...state,
        model: action.model,
        nlp_models: [],
        nlp_models_otto: [],
      };
    case Actions.TOGGLE_NLP_MODEL: {
      let currentModels = state.nlp_models;
      if (currentModels.includes(action.model)) {
        currentModels = currentModels.filter((val) => val !== action.model);
      } else {
        currentModels.push(action.model);
      }
      return {
        ...state,
        model: null,
        model_otto: null,
        nlp_models: currentModels,
      };
    }
    case Actions.TOGGLE_NLP_MODEL_OTTO: {
      let currentModelsOtto = state.nlp_models_otto;
      if (currentModelsOtto.includes(action.model)) {
        currentModelsOtto = currentModelsOtto.filter(
          (val) => val !== action.model
        );
      } else {
        currentModelsOtto.push(action.model);
      }
      return {
        ...state,
        nlp_models_otto: currentModelsOtto,
      };
    }
    case Actions.SET_SAMPLE_DATASET:
      return { ...state, sample_dataset: action.sample_dataset };
    case Actions.SET_SAMPLE_DATASET_VIEW:
      return {
        ...state,
        sample_dataset_view: action.sample_dataset,
      };
    case Actions.SET_TASK_OTTO:
      return { ...state, task_otto: action.task };
    case Actions.SET_DATASET_CATEGORY_OTTO:
      return { ...state, dataset_category_otto: action.dataset_category };
    case Actions.SET_MODEL_OTTO:
      return { ...state, model_otto: action.model };
    case Actions.SET_SAMPLE_DATASET_OTTO:
      return { ...state, sample_dataset_otto: action.sample_dataset };
    // case Actions.CLEAR_PREPROCESSORS_INCLUDING_OTTO:
    //   return { ...state, preprocessors: [], preprocessors_otto: [] };
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
    case Actions.STEPPER_HANDLE_NEXT: {
      let newStateForNext = {
        ...state,
        stepper_state:
          NumSteps === getActiveStep()
            ? NumSteps
            : StepperStateOrder[getActiveStep() + 1],
      };
      if (newStateForNext.stepper_state === StepperState.PREPROCESSORS) {
        newStateForNext = preprocessorsModifier(newStateForNext);
      }
      handleNext(newStateForNext);
      return newStateForNext;
    }
    case Actions.STEPPER_HANDLE_PREVIOUS: {
      const newStateForPrev = {
        ...state,
        stepper_state:
          StepperStateOrder[StepperStateOrder.indexOf(state.stepper_state) - 1],
        stepper_finish: false,
      };
      if (state.stepper_state === StepperState.DATASET) {
        newStateForPrev.dataset_category = null;
        newStateForPrev.sample_dataset = null;
        newStateForPrev.dataset_category_otto = null;
        newStateForPrev.sample_dataset_otto = null;
      } else if (state.stepper_state === StepperState.MODEL) {
        newStateForPrev.model = null;
        newStateForPrev.model_otto = null;
      } else if (state.stepper_state === StepperState.PREPROCESSORS) {
        newStateForPrev.preprocessors = [];
        newStateForPrev.preprocessors_otto = [];
      }
      handlePrev(newStateForPrev);
      return newStateForPrev;
    }
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
