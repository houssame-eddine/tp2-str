import {
  PREPAR_FOR_THE_SIMULATION,
  ERROR_DISPLAY,
  RESTART,
  START_SIMULATION
} from './type';

//LCM calc
function gcd2(a, b) {
  // Greatest common divisor of 2 integers
  if (!b) return b === 0 ? a : NaN;
  return gcd2(b, a % b);
}
function lcm2(a, b) {
  // Least common multiple of 2 integers
  return (a * b) / gcd2(a, b);
}
function lcm(array) {
  // Least common multiple of a list of integers
  var n = 1;
  for (var i = 0; i < array.length; ++i) n = lcm2(array[i], n);
  return n;
}

// u calc
const calcU = (p, e) => {
  let u = 0;
  for (let i = 0; i < p.length; i++) u = u + e[i] / p[i];
  return u.toFixed(3);
};

//Rm algo
const setTheAlgo = (algo, p, e, lcm) => {
  const array = [];
  for (let i = 0; i < lcm; i++) {
    array.push(['', '', '']);
  }
  //preiority checking
  let order = [...p];
  let exu = [...e];
  order.sort(function(a, b) {
    return a - b;
  });
  exu.sort(function(a, b) {
    return a - b;
  });
  let first = p
    .map((v, i) => (v === order[0] ? i + 1 : undefined))
    .filter(v => v);
  let second = p
    .map((v, i) => (v === order[1] ? i + 1 : undefined))
    .filter(v => v);
  let third = p
    .map((v, i) => (v === order[2] ? i + 1 : undefined))
    .filter(v => v);

  let exu1 = e.map((v, i) => (v === exu[0] ? i + 1 : undefined)).filter(v => v);
  let exu2 = e.map((v, i) => (v === exu[1] ? i + 1 : undefined)).filter(v => v);
  let exu3 = e.map((v, i) => (v === exu[2] ? i + 1 : undefined)).filter(v => v);

  order = [...first, ...second, ...third];
  exu = [...exu1, ...exu2, ...exu3];
  if (order.length === 9) {
    order = exu;
  } else if (order.length === 5) {
    if (order[1] === order[3]) {
      let p1 = exu
        .map((v, i) => (v === order[1] ? i + 1 : undefined))
        .filter(v => v)[0];
      let p2 = exu
        .map((v, i) => (v === order[2] ? i + 1 : undefined))
        .filter(v => v)[0];
      if (p1 < p2) {
        order[3] = undefined;
        order[4] = undefined;
      } else {
        let a = order[1];
        order[1] = order[2];
        order[2] = a;
        order[3] = undefined;
        order[4] = undefined;
      }
    } else if (order[0] === order[2]) {
      let p0 = exu
        .map((v, i) => (v === order[0] ? i + 1 : undefined))
        .filter(v => v)[0];
      let p1 = exu
        .map((v, i) => (v === order[1] ? i + 1 : undefined))
        .filter(v => v)[0];
      if (p0 < p1) {
        order[2] = order[4];
        order[3] = undefined;
        order[4] = undefined;
      } else {
        let a = order[0];
        order[0] = order[1];
        order[1] = a;
        order[2] = order[4];
        order[3] = undefined;
        order[4] = undefined;
      }
    }
  }
  order = order.filter(v => v);
  order[0] = order[0] - 1;
  order[1] = order[1] - 1;
  order[2] = order[2] - 1;
  let impo =
    order[0] === order[1] || order[0] === order[2] || order[1] === order[2];
  if (impo) {
    return [];
  }
  if (algo === 'pr') {
    for (let i = 0; i < lcm / p[order[2]]; i++) {
      for (let j = 0; j < e[order[2]]; j++) {
        if (order[2] === 0)
          array[i * p[order[2]] + j + e[order[0]] + e[order[1]]] = [
            'r',
            '',
            ''
          ];
        else if (order[2] === 1)
          array[i * p[order[2]] + j + e[order[0]] + e[order[1]]] = [
            '',
            'g',
            ''
          ];
        else if (order[2] === 2)
          array[i * p[order[2]] + j + e[order[0]] + e[order[1]]] = [
            '',
            '',
            'b'
          ];
      }
    }
    for (let i = 0; i < lcm / p[order[1]]; i++) {
      for (let j = 0; j < e[order[1]]; j++) {
        if (order[1] === 0)
          array[i * p[order[1]] + j + e[order[0]]] = ['r', '', ''];
        else if (order[1] === 1)
          array[i * p[order[1]] + j + e[order[0]]] = ['', 'g', ''];
        else if (order[1] === 2)
          array[i * p[order[1]] + j + e[order[0]]] = ['', '', 'b'];
      }
    }
    for (let i = 0; i < lcm / p[order[0]]; i++) {
      for (let j = 0; j < e[order[0]]; j++) {
        if (order[0] === 0) array[i * p[order[0]] + j] = ['r', '', ''];
        else if (order[0] === 1) {
          array[i * p[order[0]] + j] = ['', 'g', ''];
        } else if (order[0] === 2) array[i * p[order[0]] + j] = ['', '', 'b'];
      }
    }
  }
  if (algo === 'npr') {
  }
  return array;
};

export default (state, { type, payload }) => {
  switch (type) {
    case PREPAR_FOR_THE_SIMULATION:
      return {
        ...state,
        lcm: lcm(payload.p),
        u: calcU(payload.p, payload.e),
        ei: payload.e,
        pi: payload.p,
        preparationDone: true,
        showDisplay: true,
        schedulable: calcU(payload.p, payload.e) < 1 ? true : false,
        isReadyToSimulate: calcU(payload.p, payload.e) < 1 ? true : false
      };
    case ERROR_DISPLAY:
      return { ...state, pi: payload.p, ei: payload.e };
    case RESTART:
      return {
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
    case START_SIMULATION:
      return {
        ...state,
        showSimulation: true,
        preparationDone: false,
        isReadyToSimulate: false,
        algoArray: setTheAlgo(payload.algo, state.pi, state.ei, state.lcm)
      };
    default:
      return state;
  }
};