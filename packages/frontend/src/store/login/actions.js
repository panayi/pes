import { createAction } from 'redux-actions';
import { actions as authActions } from 'store/firebase/auth';
import * as types from './types';

const loginStarted = createAction(types.LOGIN_STARTED);
const loginSucceeded = createAction(types.LOGIN_SUCCEEDED);
const loginFailed = createAction(types.LOGIN_FAILED);
const loginReset = createAction(types.LOGIN_RESET);

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

export const loginWithPhoneNumber = (...args) => async dispatch => {
  try {
    dispatch(loginStarted());
    const confirmationResult = await dispatch(
      authActions.loginWithPhoneNumber(...args),
    );
    dispatch(loginReset());

    const confirm = async (...confirmArgs) => {
      try {
        dispatch(loginStarted());
        await confirmationResult.confirm(...confirmArgs);
        dispatch(loginSucceeded());
      } catch (error) {
        dispatch(loginFailed());
        throw error;
      }
    };

    return { confirm };
  } catch (error) {
    dispatch(loginFailed());
    throw error;
  }
};
