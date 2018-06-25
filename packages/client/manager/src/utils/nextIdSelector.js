import * as R from 'ramda';
import { createSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import propOrSelector from '@pesposa/core/src/utils/propOrSelector';

const nextIdSelector = createSelector(
  propSelector('currentId'),
  propOrSelector([], 'collection'),
  (currentId, collection) => {
    const index = R.findIndex(R.propEq('id', currentId), collection);
    const collectionWithoutCurrent = R.remove(index, 1, collection);
    const totalItems = R.length(collectionWithoutCurrent);
    const finalIndex = index > totalItems - 1 ? 0 : index;
    return R.compose(
      R.prop('id'),
      R.nth(R.__, collectionWithoutCurrent),
    )(finalIndex);
  },
);

export default nextIdSelector;
