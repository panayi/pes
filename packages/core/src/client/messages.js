import * as R from 'ramda';
import * as modelPaths from '../config/modelPaths';
import getTimestamp from '../utils/getTimestamp';

export const create = (firebase, data, adId, buyerId) => {
  const finalData = R.assoc('createdAt', getTimestamp(firebase), data);
  return firebase.push(modelPaths.MESSAGES(adId, buyerId).string, finalData);
};
