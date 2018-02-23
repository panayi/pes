import { createAction } from 'redux-actions';
// import { actions as authActions } from 'store/firebase/auth';
import * as types from './types';

export const loginStarted = createAction(types.LOGIN_STARTED);
export const loginSucceeded = createAction(types.LOGIN_SUCCEEDED);
export const loginFailed = createAction(types.LOGIN_FAILED);
export const loginReset = createAction(types.LOGIN_RESET);

// export const login = (...args) => async dispatch => {
//   dispatch(loginStarted());
//   try {
//     await dispatch(authActions.login(...args));
//     dispatch(loginSucceeded());
//   } catch (error) {
//     dispatch(loginFailed());
//     throw error;
//   }
// };

// export const loginWithPhoneNumber = (...args) => async dispatch => {
//   try {
//     dispatch(loginStarted());
//     const confirmationResult = await dispatch(
//       authActions.loginWithPhoneNumber(...args),
//     );
//     dispatch(loginReset());

//     const confirm = async (...confirmArgs) => {
//       try {
//         dispatch(loginStarted());
//         await confirmationResult.confirm(...confirmArgs);
//         dispatch(loginSucceeded());
//       } catch (error) {
//         dispatch(loginFailed());
//         throw error;
//       }
//     };

//     return {
//       ...confirmationResult,
//       confirm,
//     };
//   } catch (error) {
//     dispatch(loginFailed());
//     throw error;
//   }
// };
