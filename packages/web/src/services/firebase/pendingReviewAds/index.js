import * as R from 'ramda';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import getTimestamp from '@pesposa/core/src/utils/getTimestamp';

export const create = ad => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  const finalAd = R.assoc('createdAt', getTimestamp(firebase), ad);
  return getFirebase().push(modelPaths.PENDING_REVIEW_ADS.string, finalAd);
};
