import * as R from 'ramda';
import { isNilOrEmpty, isNaN } from 'ramda-adjunct';
import computedProp from '@pesposa/core/src/utils/computedProp';

// TODO: don't think this is needed as `price` is required
const serializePrice = R.compose(
  R.when(
    R.propSatisfies(R.either(isNilOrEmpty, isNaN), 'price'),
    R.dissoc('price'),
  ),
);

const serializeImages = computedProp(
  'images',
  R.compose(R.map(R.omit(['dimensions'])), R.defaultTo({}), R.prop('images')),
);

export const serializeAd = R.compose(serializePrice, serializeImages);
