import * as R from 'ramda';
import propsSelector from './propsSelector';
import makeArray from './makeArray';

export default path =>
  R.compose(R.compose(R.path, makeArray)(path), propsSelector);
