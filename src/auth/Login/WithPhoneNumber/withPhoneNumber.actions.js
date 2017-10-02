/* @flow */
import R from 'ramda';
import { createAction } from 'redux-actions';
import { actions } from 'react-redux-form';
import { updateProfile } from '../../auth';
import * as constants from './withPhoneNumber.constants';
import * as selectors from './withPhoneNumber.selectors';
import {
  type PhoneNumberValues,
  type CodeValues,
} from './withPhoneNumber.types';

// ------------------------------------
// Actions
// ------------------------------------
const reset = createAction(constants.RESET);
const sendSmsStart = createAction(constants.SMS_SEND_STARTED);
const sendSmsSuccess = createAction(constants.SMS_SEND_SUCCEEDED);
const sendSmsFail = createAction(constants.SMS_SEND_FAILED);
const codeValidationStart = createAction(constants.CODE_VALIDATION_STARTED);
const codeValidationSuccess = createAction(constants.CODE_VALIDATION_SUCCEEDED);
const codeValidationFail = createAction(constants.CODE_VALIDATION_FAILED);

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
