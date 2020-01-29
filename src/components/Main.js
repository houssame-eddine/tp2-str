import React, { useEffect, useContext } from 'react';
import SetData from './SetData';
import Display from './Display';
import Simulation from './Simulation';
import { context } from '../hooks/context';

const Main = ({ location }) => {
  let rm = location.pathname === '/preemptif' ? 'pr' : null;
  rm = location.pathname === '/non-preemptif' ? 'npr' : rm;
  const { restart } = useContext(context);

  useEffect(() => {
    restart();
  }, [rm]);
  return (
    <div className='main'>
      <div className='inputData'>
        <SetData r={rm} />
        <Display />
      </div>
      <Simulation r={rm} />
    </div>
  );
};

export default Main;
