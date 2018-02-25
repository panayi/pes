import { modelPaths } from 'pesposa-config';

export const create = (data, adId, buyerId) => (
  dispatch,
  getState,
  getFirebase,
) => getFirebase().push(modelPaths.MESSAGES(adId, buyerId).string, data);
