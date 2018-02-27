import * as modelPaths from '@pesposa/core/src/config/modelPaths';

export const update = (uid, data) => (dispatch, getState, getFirebase) =>
  getFirebase().update(modelPaths.DRAFT_AD(uid).string, data);

export const remove = uid => (dispatch, getState, getFirebase) =>
  getFirebase().remove(modelPaths.DRAFT_AD(uid).string);
