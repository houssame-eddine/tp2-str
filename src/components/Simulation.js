import React, { useContext } from 'react';
import { context } from '../hooks/context';
import Figure from './Figure';

const Simulation = ({ r }) => {
  const {
    isReadyToSimulate,
    preparationDone,
    restart,
    showSimulation,
    startSimulation
  } = useContext(context);
  if (isReadyToSimulate)
    return (
      <div className='simulation'>
        <div className='start'>
          <div className='buttons'>
            <button onClick={() => startSimulation(r)}>
              start the simulation
            </button>
            <button onClick={restart}>restart</button>
          </div>
        </div>
      </div>
    );
  if (preparationDone)
    return (
      <div className='simulation_error'>
        <h1>scheduling error ,please change the values and try again</h1>
        <button onClick={restart}>try again</button>
      </div>
    );
  if (showSimulation) {
    return (
      <div className='sim'>
        <Figure />
        <button onClick={restart}>try again</button>
      </div>
    );
  }
  return null;
};

export default Simulation;
