import React from "react";
import { useReducer, createContext, useContext } from "react";

// See https://www.basefactor.com/global-state-with-react for details
const initialState = {
  num: 0,
  text: "foo",
  bool: false,
};

const GlobalStateContext = createContext(initialState);
const DispatchStateContext = createContext(undefined);

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    initialState
  );
  return (
    <GlobalStateContext.Provider value={state}>
      <DispatchStateContext.Provider value={dispatch}>
        {children}
      </DispatchStateContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => [
  useContext(GlobalStateContext),
  useContext(DispatchStateContext),
];
