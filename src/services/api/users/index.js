import * as modelPaths from 'constants/modelPaths';

export const update = (id, isAnonymous, data) => (
  dispatch,
  getState,
  getFirebase,
) => {
  const path = isAnonymous
    ? `/${modelPaths.ANONYMOUS_USERS.string}/${id}`
    : `/${modelPaths.USERS.string}/${id}`;
  return getFirebase().update(path, data);
};
