import * as R from 'ramda';
import propSelector from 'utils/propSelector';

// getAdImages :: Ad -> [String] | Nil
const getAdImages = R.compose(
  R.defaultTo([]),
  R.values,
  propSelector('images'),
  R.defaultTo({}),
);

export { getAdImages };
