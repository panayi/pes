import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import { actionTypes } from 'react-redux-firebase';
import * as types from './types';

const initialState = null;

export default handleActions(
  {
    [actionTypes.LOGIN]: (state, payload) => {
      const auth = payload.auth.toJSON();
      if (auth.isAnonymous) {
        return R.path(['stsTokenManager', 'accessToken'], auth);
      }

      return state;
    },

    [types.RESET]: R.always(initialState),
  },
  initialState,
);
