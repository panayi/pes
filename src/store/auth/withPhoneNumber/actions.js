/* @flow */
import * as R from 'ramda';
import { createAction } from 'redux-actions';
import { actions } from 'react-redux-form';
import { updateProfile } from 'store/auth/actions';
import { actions as anonymousUserIdActions } from '../anonymousUserId';
import * as types from './types';
import * as selectors from './selectors';
import { type PhoneNumberValues, type CodeValues } from './flowtypes';

const reset = createAction(types.RESET);
const sendSmsStart = createAction(types.SMS_SEND_STARTED);
const sendSmsSuccess = createAction(types.SMS_SEND_SUCCEEDED);
const sendSmsFail = createAction(types.SMS_SEND_FAILED);
const codeValidationStart = createAction(types.CODE_VALIDATION_STARTED);
const codeValidationSuccess = createAction(types.CODE_VALIDATION_SUCCEEDED);
const codeValidationFail = createAction(types.CODE_VALIDATION_FAILED);

const resetRecaptcha = (recaptcha) => {
  if (recaptcha && recaptcha.reset) {
    recaptcha.reset();
  }
};

export const resetAll = (recaptcha: Object) => (dispatch: Dispatch) => {
  resetRecaptcha(recaptcha);
  dispatch(actions.reset('forms.phoneNumberLogin'));
  dispatch(reset());
};

export const submitPhoneNumberForm = (values: PhoneNumberValues, recaptcha: Object) =>
  (dispatch: Dispatch, getState: Function, getFirebase: Function) => {
    const { phoneNumber } = values;
    const firebase = getFirebase();

    dispatch(sendSmsStart());

    firebase.auth()
      .signInWithPhoneNumber(phoneNumber, recaptcha.verifier)
      .then((result) => {
        dispatch(sendSmsSuccess(result));
        dispatch(anonymousUserIdActions.maybeSetAnonymousUserId());
      })
      .catch((error) => {
        dispatch(sendSmsFail(error));
      });
  };

export const submitCodeForm = (values: CodeValues) =>
  (dispatch: Dispatch, getState: Function, getFirebase: Function) => {
    const { code } = values;
    const firebase = getFirebase();
    const confirmationResult = selectors.confirmationResultSelector(getState());

    dispatch(codeValidationStart());

    const credential = firebase.auth.PhoneAuthProvider.credential(
      confirmationResult.verificationId,
      code,
    );
    firebase.auth()
      .signInWithCredential(credential)
      .then((result) => {
        const user = result.toJSON();

        // FIXME: for some reason updateProfile doesn't work
        // unless we add some delay
        setTimeout(() => {
          dispatch(updateProfile(user));
        }, 1000);

        return Promise.resolve(result);
      })
      .then(R.compose(dispatch, codeValidationSuccess))
      .catch((error) => {
        dispatch(codeValidationFail(error));
      });
  };
