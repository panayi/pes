import * as modelTypes from 'constants/modelPaths';

export const update = (uid, data) => (dispatch, getState, getFirebase) =>
  getFirebase().update(modelTypes.DRAFT_AD(uid).string, data);

export const remove = uid => (dispatch, getState, getFirebase) =>
  getFirebase().remove(modelTypes.DRAFT_AD(uid).string);
