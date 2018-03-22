import * as modelPaths from '@pesposa/core/src/config/modelPaths';

export const create = data => (dispatch, getState, getFirebase) =>
  getFirebase().push(modelPaths.RATINGS.string, data);
