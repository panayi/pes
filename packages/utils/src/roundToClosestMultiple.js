import * as R from 'ramda';

const roundToClosestMultiple = (number, multiple) =>
  R.compose(R.multiply(multiple), Math.ceil, R.divide(number))(multiple);

export default roundToClosestMultiple;
