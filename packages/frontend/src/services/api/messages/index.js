import { modelPaths } from 'pesposa-core/constants';

export const create = (message, { ad, uid }) => (
  dispatch,
  getState,
  getFirebase,
) => getFirebase().push(modelPaths.MESSAGES(ad.id, uid).string, message);
