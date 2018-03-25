import * as R from 'ramda';

const round = R.curry((value, decimals = 2) => {
  const base = 10 ** decimals;
  return Math.round(value * base) / base;
});

export default round;
