import React, { useContext } from 'react';
import { context } from '../hooks/context';

const Figure = () => {
  const { algoArray } = useContext(context);
  if (!algoArray.length)
    return (
      <div className='sim-err'>we cant set the preoriy of these values</div>
    );
  return (
    <div className='figure'>
      <div className='row'>
        <div>T1</div>
        <div>T2</div>
        <div>T3</div>
        <div></div>
        <div></div>
      </div>
      {algoArray.map((val, index) => (
        <div className='row' key={index}>
          <div className={`bo ${val[0]}`}></div>
          <div className={`bo ${val[1]}`}></div>
          <div className={`bo ${val[2]}`}></div>
          <div className='bo'></div>
          <div>{index + 1}</div>
        </div>
      ))}
    </div>
  );
};

export default Figure;
