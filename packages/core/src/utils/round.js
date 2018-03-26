import * as R from 'ramda';

const round = R.curry((value, decimals = 2) => {
  const base = Math.pow(10, decimals); // eslint-disable-line no-restricted-properties
  return Math.round(value * base) / base;
});

export default round;
