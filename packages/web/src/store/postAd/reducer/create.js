import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import * as types from '../types';
import * as constants from '../constants';

const initialState = constants.AD_CREATE_IDLE_STATE;

export default handleActions(
  {
    [types.AD_CREATE_PENDING]: R.always(constants.AD_CREATE_PENDING_STATE),

    [types.AD_CREATE_COMPLETED]: R.always(constants.AD_CREATE_COMPLETED_STATE),

    [types.AD_CREATE_RESET]: R.always(initialState),
  },
  initialState,
);
