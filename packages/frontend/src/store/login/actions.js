import { createAction } from 'redux-actions';
import { actions as authActions } from 'store/firebase/auth';
import * as constants from './constants';

const loginStarted = createAction(constants.LOGIN_STARTED);
const loginSucceeded = createAction(constants.LOGIN_SUCCEEDED);
const loginFailed = createAction(constants.LOGIN_FAILED);

export const login = (...args) => async dispatch => {
  dispatch(loginStarted());
  try {
    await dispatch(authActions.login(...args));
    dispatch(loginSucceeded());
  } catch (error) {
    dispatch(loginFailed());
    throw error;
  }
};
