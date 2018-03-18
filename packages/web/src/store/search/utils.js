import * as R from 'ramda';

export const getWrappedState = (getState, searchId) =>
  R.prop(searchId, getState());
