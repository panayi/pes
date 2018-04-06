import * as externalUsers from '@pesposa/core/src/client/externalUsers';

export const create = externalUser => (dispatch, getState, getFirebase) =>
  externalUsers.create(getFirebase(), externalUser);

export const update = (id, externalUser) => (dispatch, getState, getFirebase) =>
  externalUsers.update(getFirebase(), id, externalUser);

export const remove = id => (dispatch, getState, getFirebase) =>
  externalUsers.remove(getFirebase(), id);
