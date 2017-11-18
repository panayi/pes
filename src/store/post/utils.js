import * as R from 'ramda';
import { isNilOrEmpty, isNaN } from 'ramda-adjunct';

const serializePrice = R.compose(
  R.when(
    R.propSatisfies(R.either(isNilOrEmpty, isNaN), 'price'),
    R.dissoc('price'),
  ),
  R.over(
    R.lensProp('price'),
    parseFloat,
  ),
);

export const serializePost = R.compose(
  serializePrice,
);
