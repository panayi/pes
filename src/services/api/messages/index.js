import * as modelPaths from 'constants/modelPaths';

export const create = (message, { ad, uid }) => (
  dispatch,
  getState,
  getFirebase,
) => getFirebase().push(modelPaths.MESSAGES(ad.id, uid).string, message);
