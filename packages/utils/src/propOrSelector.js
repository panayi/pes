import * as R from 'ramda';
import propSelector from './propSelector';

export default (defaultValue, path) =>
  R.compose(R.defaultTo(defaultValue), propSelector)(path);
