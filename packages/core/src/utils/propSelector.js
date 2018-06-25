import * as R from 'ramda';
import { ensureArray } from 'ramda-adjunct';
import propsSelector from './propsSelector';

const propSelector = path =>
  R.compose(
    R.compose(
      R.path,
      ensureArray,
    )(path),
    propsSelector,
  );

export default propSelector;
