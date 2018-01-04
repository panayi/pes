import * as modelTypes from 'constants/modelTypes';

export const update = (uid, data) => (dispatch, getState, getFirebase) =>
  getFirebase().update(`${modelTypes.PENDING_ADS}/${uid}`, data);

export const remove = uid => (dispatch, getState, getFirebase) =>
  getFirebase().remove(`${modelTypes.PENDING_ADS}/${uid}`);
