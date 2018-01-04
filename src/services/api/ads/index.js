import * as modelTypes from 'constants/modelTypes';

export const create = ad => (dispatch, getState, getFirebase) =>
  getFirebase().push(`/${modelTypes.ADS}`, ad);

export const update = (id, data) => (dispatch, getState, getFirebase) =>
  getFirebase().update(`/${modelTypes.ADS}/${id}`, data);
