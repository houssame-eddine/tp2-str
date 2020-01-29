import React, { useContext } from 'react';
import { context } from '../hooks/context';

const Display = () => {
  const { lcm, schedulable, u, pi, showDisplay } = useContext(context);
  if (showDisplay)
    return (
      <div className='display'>
        <h2>{`LCM(${pi[0]},${pi[1]},${pi[2]})  :  ${lcm}`}</h2>
        <h2>U = {u}</h2>
        <h2>schedulable :{schedulable ? '  true' : '  false'}</h2>
      </div>
    );
  return null;
};

export default Display;
