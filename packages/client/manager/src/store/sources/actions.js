import * as sources from '@pesposa/core/src/client/sources';

export const create = source => (dispatch, getState, getFirebase) =>
  sources.create(getFirebase(), source);

export const update = (id, source) => (dispatch, getState, getFirebase) =>
  sources.update(getFirebase(), id, source);

export const remove = id => (dispatch, getState, getFirebase) =>
  sources.remove(getFirebase(), id);
