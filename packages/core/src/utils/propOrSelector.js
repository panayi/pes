import * as R from 'ramda';
import { ensureArray } from 'ramda-adjunct';
import propsSelector from './propsSelector';

export const propOrSelector = (defaultValue, path) =>
  R.compose(
    R.compose(
      R.pathOr(defaultValue),
      ensureArray,
    )(path),
    propsSelector,
  );

export default propOrSelector;
