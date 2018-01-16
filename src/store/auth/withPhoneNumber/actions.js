/* @flow */
import * as R from 'ramda';
import { createAction } from 'redux-actions';
import { actions } from 'react-redux-form';
import { models as formModels } from 'store/forms';
import { actions as userActions } from 'store/user';
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

const resetRecaptcha = recaptcha => {
  if (recaptcha && recaptcha.reset) {
    recaptcha.reset();
  }
};

export const resetAll = (recaptcha: Object) => (dispatch: Dispatch) => {
  resetRecaptcha(recaptcha);
  dispatch(actions.reset(formModels.phoneNumberLogin.path));
  dispatch(reset());
};

export const submitPhoneNumberForm = (
  values: PhoneNumberValues,
  recaptcha: Object,
) => (dispatch: Dispatch, getState: Function, getFirebase: Function) => {
  const { phoneNumber } = values;
  const firebase = getFirebase();

  dispatch(sendSmsStart());

  // TODO: refactor to services/api methods
  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, recaptcha.verifier)
    .then(result => {
      dispatch(sendSmsSuccess(result));
    })
    .catch(error => {
      dispatch(sendSmsFail(error));
    });
};

export const submitCodeForm = (
  values: CodeValues,
  onSuccess: ?Function,
  onError: ?Function,
) => (dispatch: Dispatch, getState: Function, getFirebase: Function) => {
  const { code } = values;
  const firebase = getFirebase();
  const confirmationResult = selectors.confirmationResultSelector(getState());

  dispatch(codeValidationStart());

  const credential = firebase.auth.PhoneAuthProvider.credential(
    confirmationResult.verificationId,
    code,
  );

  // TODO: refactor to services/api methods
  firebase
    .auth()
    .signInWithCredential(credential)
    .then(result => {
      const user = result.toJSON();

      // FIXME: for some reason setProfile doesn't work
      // unless we add some delay
      setTimeout(() => {
        dispatch(userActions.setProfile(user));
      }, 1000);

      return Promise.resolve(result);
    })
    .then(() => {
      dispatch(codeValidationSuccess);
      if (R.is(Function, onSuccess)) {
        onSuccess();
      }
    })
    .catch(error => {
      dispatch(codeValidationFail(error));
      if (R.is(Function, onError)) {
        onError(error);
      }
    });
};
