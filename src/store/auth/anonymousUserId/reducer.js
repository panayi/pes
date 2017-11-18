import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import { actionTypes } from 'react-redux-firebase';
import * as types from './types';

const initialState = null;

export default handleActions({
  [actionTypes.LOGIN]: (state, { auth }) => {
    if (auth.isAnonymous) {
      return auth.uid;
    }

    return state;
  },

  [types.RESET]: R.always(initialState),
}, initialState);
