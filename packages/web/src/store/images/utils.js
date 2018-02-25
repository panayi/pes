import * as R from 'ramda';
import { propSelector } from 'pesposa-utils';

// getAdImages :: Ad -> [String] | Nil
const getAdImages = R.compose(
  R.defaultTo([]),
  R.values,
  propSelector('images'),
  R.defaultTo({}),
);

export { getAdImages };
