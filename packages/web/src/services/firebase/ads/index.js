import * as modelPaths from '@pesposa/core/src/config/modelPaths';

export const update = (id, data) => (dispatch, getState, getFirebase) =>
  getFirebase().update(`/${modelPaths.ADS(false).string}/${id}`, data);

export const remove = id => (dispatch, getState, getFirebase) =>
  getFirebase().remove(`/${modelPaths.ADS(false).string}/${id}`);
