import * as R from 'ramda';
import { isNilOrEmpty, isNaN } from 'ramda-adjunct';

// TODO: don't think this is needed as `price` is required
const serializePrice = R.compose(
  R.when(
    R.propSatisfies(R.either(isNilOrEmpty, isNaN), 'price'),
    R.dissoc('price'),
  ),
);

export const serializeAd = R.compose(serializePrice);
