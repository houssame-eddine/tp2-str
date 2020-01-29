import React, { useReducer } from 'react';
import reducer from './reducer';
import {
  PREPAR_FOR_THE_SIMULATION,
  ERROR_DISPLAY,
  RESTART,
  START_SIMULATION
} from './type';

const context = React.createContext();
const Provider = ({ children }) => {
  const initialState = {
    showDisplay: false,
    showSimulation: false,
    lcm: null,
    schedulable: false,
    pi: [],
    ei: [],
    u: null,
    preparationDone: false,
    isReadyToSimulate: false,
    algoArray: []
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const prepareForTheSimulation = (p, e) => {
    dispatch({ type: PREPAR_FOR_THE_SIMULATION, payload: { p: p, e: e } });
  };

  const displayError = (p, e) => {
    dispatch({ type: ERROR_DISPLAY, payload: { p, e } });
  };
  const restart = () => {
    dispatch({ type: RESTART });
  };

  const startSimulation = r => {
    dispatch({ type: START_SIMULATION, payload: { algo: r } });
  };

  return (
    <context.Provider
      value={{
        ...state,
        prepareForTheSimulation,
        displayError,
        restart,
        startSimulation
      }}
    >
      {children}
    </context.Provider>
  );
};

export { Provider, context };
