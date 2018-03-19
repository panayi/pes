import * as R from 'ramda';
import * as constants from './constants';

export const getStateWithSearch = (searchId, getState) => {
  const state = getState();
  const searchState = R.path([searchId, constants.ROOT_KEY], state);
  return R.assoc(constants.ROOT_KEY, searchState, state);
};
