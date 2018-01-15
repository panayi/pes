import * as modelPaths from 'constants/modelPaths';

export const update = (id, data) => (dispatch, getState, getFirebase) =>
  getFirebase().update(`/${modelPaths.USERS.string}/${id}`, data);
