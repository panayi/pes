import * as R from 'ramda';
import computedProp from '@pesposa/core/src/utils/computedProp';

export const fileMetadataFactory = (uploadTaskSnapshot, firebase, metadata) =>
  R.compose(
    R.pick([
      'name',
      'fullPath',
      'downloadURL',
      'contentType',
      'size',
      'createdAt',
    ]),
    computedProp(
      'createdAt',
      R.compose(date => new Date(date).getTime(), R.propOr([], 'timeCreated')),
    ),
    computedProp(
      'downloadURL',
      R.compose(R.head, R.propOr([], 'downloadURLs')),
    ),
  )(metadata);
