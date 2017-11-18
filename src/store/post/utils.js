import * as R from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

export const serializePost = R.compose(
  R.over(
    R.lensProp('price'),
    R.unless(
      isNilOrEmpty,
      parseFloat,
    ),
  ),
);
