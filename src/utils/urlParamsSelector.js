import * as R from 'ramda';
import propsSelector from './propsSelector';

export default R.compose(
  R.pathOr({}, ['match', 'params']),
  propsSelector,
);
