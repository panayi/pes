import * as R from 'ramda';
import { isNilOrEmpty, isNaN } from 'ramda-adjunct';

// TODO: don't think this is needed as `title` is required
const serializeTitle = R.when(
  R.propSatisfies(isNilOrEmpty, 'title'),
  R.dissoc('title'),
);

// TODO: don't think this is needed as `price` is required
const serializePrice = R.compose(
  R.when(
    R.propSatisfies(R.either(isNilOrEmpty, isNaN), 'price'),
    R.dissoc('price'),
  ),
  R.over(R.lensProp('price'), parseFloat),
);

export const serializeAd = R.compose(serializeTitle, serializePrice);
