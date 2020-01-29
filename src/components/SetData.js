import React, { useContext, useState, useEffect } from 'react';
import { context } from '../hooks/context';

const SetData = ({ r }) => {
  const array = [1, 2, 3];
  const {
    preparationDone,
    prepareForTheSimulation,
    displayError,
    showSimulation,
    showDisplay,
    pi,
    ei
  } = useContext(context);
  const [p, setP] = useState(['', '', '']);
  const [e, setE] = useState(['', '', '']);
  useEffect(() => {
    setP(['', '', '']);
    setE(['', '', '']);
  }, [r]);
  return (
    <div className='set-data'>
      <div className='table'>
        <div className={showDisplay ? 'over' : ''}></div>
        <div className='row'>
          <input type='text' value='task' readOnly className='bg' />
          <input type='text' value='pi' readOnly className='bg' />
          <input type='text' value='ei' readOnly className='bg' />
        </div>
        {array.map((val, index) => (
          <div className='row' key={index}>
            <input type='text' readOnly value={`T${val}`} className='bg2' />
            <input
              className={pi[index] === '' ? 'err' : ''}
              type='number'
              value={p[index] + ''}
              onChange={e => {
                if (e.target.value.length <= 3) {
                  let array = [...p];
                  array[index] = +e.target.value;
                  setP(array);
                }
              }}
            />
            <input
              className={ei[index] === '' ? 'err' : ''}
              type='number'
              value={e[index] + ''}
              onChange={event => {
                if (event.target.value.length <= 3) {
                  let array = [...e];
                  array[index] = +event.target.value;
                  setE(array);
                }
              }}
            />
          </div>
        ))}
      </div>
      {!preparationDone && !showSimulation ? (
        <button
          onClick={() => {
            const err1 = p.find(v => !v);
            const err2 = e.find(v => !v);
            if (err1 === undefined && err2 === undefined)
              prepareForTheSimulation(p, e);
            else {
              displayError(p, e);
            }
          }}
        >
          prepare for the simulation
        </button>
      ) : null}
    </div>
  );
};

export default SetData;
