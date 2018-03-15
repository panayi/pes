import * as R from 'ramda';
import * as modelPaths from '@pesposa/core/src/config/modelPaths';
import getTimestamp from '@pesposa/core/src/utils/getTimestamp';

export const create = (data, adId, buyerId) => (
  dispatch,
  getState,
  getFirebase,
) => {
  const firebase = getFirebase();
  const finalData = R.assoc('createdAt', getTimestamp(firebase), data);
  return firebase.push(modelPaths.MESSAGES(adId, buyerId).string, finalData);
};
