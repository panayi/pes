import * as modelTypes from 'constants/modelTypes';

export const create = (message, { ad, uid }) => (
  dispatch,
  getState,
  getFirebase,
) => getFirebase().push(`/${modelTypes.MESSAGES}/${ad.id}/${uid}/`, message);
