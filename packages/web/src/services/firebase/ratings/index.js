import * as modelPaths from '@pesposa/core/src/config/modelPaths';

export const create = (uid, data) => (dispatch, getState, getFirebase) =>
  getFirebase().set(modelPaths.RATINGS(uid).string, data);
