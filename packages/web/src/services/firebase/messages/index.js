import * as modelPaths from '@pesposa/core/src/config/modelPaths';

export const create = (data, adId, buyerId) => (
  dispatch,
  getState,
  getFirebase,
) => getFirebase().push(modelPaths.MESSAGES(adId, buyerId).string, data);
