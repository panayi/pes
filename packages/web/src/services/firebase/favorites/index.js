import * as modelPaths from '@pesposa/core/src/config/modelPaths';

export const create = (uid, adId) => (dispatch, getState, getFirebase) =>
  getFirebase().set(`/${modelPaths.FAVORITES(uid).string}/${adId}`, true);

export const remove = (uid, adId) => (dispatch, getState, getFirebase) =>
  getFirebase().remove(`/${modelPaths.FAVORITES(uid).string}/${adId}`);
