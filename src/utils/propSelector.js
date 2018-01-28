import * as R from 'ramda';
import propsSelector from './propsSelector';
import makeArray from './makeArray';

const propSelector = path =>
  R.compose(R.compose(R.path, makeArray)(path), propsSelector);

export default propSelector;
