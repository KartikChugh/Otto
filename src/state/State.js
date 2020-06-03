import React from "react";
import { useReducer, createContext, useContext } from "react";

import { InitialState, StateType } from "state/StateTypes";
import { ActionType, Actions } from "state/Actions";

// See https://www.basefactor.com/global-state-with-react for details
const initialState = InitialState;

const StateContext = createContext(initialState);
const DispatchStateContext = createContext(undefined);

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case Actions.SET_TASK:
      const newState = { ...state, task: action.task };
      console.log(newState);
      return newState;
    case Actions.SET_DATASET_CATEGORY:
      return { ...state, dataset_category: action.dataset_category };
    default:
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
