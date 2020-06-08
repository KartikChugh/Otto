import React from "react";
import { useReducer, createContext, useContext } from "react";

import { deleteMessages, addResponseMessage } from "react-chat-widget";
import { InitialState, StateType } from "state/StateTypes";
import { ActionType, Actions } from "state/Actions";
import { StepperStateOrder } from "state/StateTypes";

import { initializeWidget } from "containers/WidgetContainer";

// See https://www.basefactor.com/global-state-with-react for details
const initialState = InitialState;

export const StateContext = createContext(initialState);
export const DispatchStateContext = createContext(() => null);
const NumSteps = StepperStateOrder.length;

function reducer(state: StateType, action: ActionType): StateType {
  const getActiveStep = () => {
    return StepperStateOrder.indexOf(state.stepper_state);
  };

  switch (action.type) {
    case Actions.SET_TASK:
      const newState = { ...state, task: action.task };
      return newState;
    case Actions.SET_DATASET_CATEGORY:
      return { ...state, dataset_category: action.dataset_category };
    case Actions.SET_MODEL:
      return { ...state, model: action.model };
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
      return initialState;
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

export const useState = () => [
  useContext(StateContext),
  useContext(DispatchStateContext),
];
