import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import { actionTypes, getFirebase as g } from 'react-redux-firebase';
import * as types from './types';

const initialState = null;

export default handleActions({
  [actionTypes.PROFILE_UPDATE_SUCCESS]: (state, { payload }) => {
    const { currentUser } = g().auth();

    if (currentUser && currentUser.isAnonymous) {
      return payload;
    }

    return state;
  },

  [types.RESET]: R.always(initialState),
}, initialState);
