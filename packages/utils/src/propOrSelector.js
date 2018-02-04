import * as R from 'ramda';
import propSelector from './propSelector';

const propOrSelector = (defaultValue, path) =>
  R.compose(R.defaultTo(defaultValue), propSelector)(path);

export default propOrSelector;
