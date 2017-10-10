import * as R from 'ramda';
import propsSelector from './props';

export default R.compose(
  R.pathOr({}, ['match', 'params']),
  propsSelector,
);
