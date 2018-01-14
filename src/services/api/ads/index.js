import * as modelPaths from 'constants/modelPaths';

export const create = ad => (dispatch, getState, getFirebase) =>
  getFirebase().push(modelPaths.ADS.string, ad);

export const update = (id, data) => (dispatch, getState, getFirebase) =>
  getFirebase().update(`/${modelPaths.ADS.string}/${id}`, data);
