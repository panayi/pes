/* @flow */
import React, { Component } from 'react';
import R from 'ramda';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { withProps } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { LocalForm, Control } from 'react-redux-form';
import PhoneInput from 'react-phone-input';
import { Button } from 'rebass';
import generateClassName from '../../../lib/helpers/generateClassName';
import { actions as authActions } from '../../auth';
import {
  actions,
  selectors,
  STATUS_IDLE,
  STATUS_SMS_SEND_STARTED,
  STATUS_SMS_SEND_SUCCEEDED,
  STATUS_SMS_SEND_FAILED,
  STATUS_CODE_VALIDATION_STARTED,
  STATUS_CODE_VALIDATION_SUCCEEDED,
  STATUS_CODE_VALIDATION_FAILED,
} from './withPhoneNumber';

const BUTTON_ID: String = generateClassName();

type Props = {
  status: String,
  confirmationResult: Object,
  error: Object,
  reset: Function,
  sendSmsStart: Function,
  sendSmsSuccess: Function,
  sendSmsFail: Function,
  codeValidationStart: Function,
  codeValidationSuccess: Function,
  codeValidationFail: Function,
  updateProfile: Function,
  firebase: Object,
  showPhoneNumberForm: Boolean,
  showCodeForm: Boolean,
  showError: Boolean,
  showLoading: Boolean,
  showTryAgain: Boolean,
};

type PhoneNumberValues = {
  phoneNumber: String,
};

type CodeValues = {
  code: String,
};

export class WithPhoneNumber extends Component<Props> {
  componentDidMount() {
    this.reset();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  recaptchaVerifier: Object

  reset() {
    this.props.reset();
    this.createRecaptcha();
  }

  createRecaptcha = () => {
    const { RecaptchaVerifier } = this.props.firebase.auth;
    this.recaptchaVerifier = new RecaptchaVerifier(BUTTON_ID, {
      size: 'invisible',
    });
  }

  handleSubmitPhoneNumberForm = (values: PhoneNumberValues) => {
    const { phoneNumber } = values;
    const { firebase, sendSmsStart, sendSmsSuccess, sendSmsFail } = this.props;

    sendSmsStart();

    firebase.auth()
      .signInWithPhoneNumber(phoneNumber, this.recaptchaVerifier)
      .then(sendSmsSuccess)
      .catch(sendSmsFail);
  }

  handleSubmitCodeForm = (values: CodeValues) => {
    const { code } = values;
    const {
      confirmationResult,
      codeValidationStart,
      codeValidationSuccess,
      codeValidationFail,
      firebase,
      updateProfile,
    } = this.props;

    codeValidationStart();

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
          updateProfile(user);
        }, 1000);

        return Promise.resolve(result);
      })
      .then(codeValidationSuccess)
      .catch(codeValidationFail);
  }

  renderPhoneNumberForm() {
    if (!this.props.showPhoneNumberForm) {
      return null;
    }

    return (
      <LocalForm
        onSubmit={(values: PhoneNumberValues) => this.handleSubmitPhoneNumberForm(values)}
      >
        <Control.text
          component={PhoneInput}
          defaultCountry="cy"
          model=".phoneNumber"
          placeholder="Enter phone number"
          validators={{
            required: (val: String) => val && val.length,
          }}
        />
        <Button
          id={BUTTON_ID}
          type="submit"
        >
          Sign in with phone number
        </Button>
      </LocalForm>
    );
  }

  renderCodeForm() {
    if (!this.props.showCodeForm) {
      return null;
    }

    return (
      <LocalForm
        onSubmit={(values: CodeValues) => this.handleSubmitCodeForm(values)}
      >
        <Control.text
          model=".code"
          placeholder="Enter SMS code"
        />
        <Button
          id={BUTTON_ID}
          type="submit"
        >
          Submit
        </Button>
      </LocalForm>
    );
  }

  renderError() {
    if (!this.props.showError) {
      return null;
    }

    return (
      <span>
        {this.props.error.message}
      </span>
    );
  }

  renderLoading() {
    if (!this.props.showLoading) {
      return null;
    }

    return 'loading';
  }

  renderTryAgain() {
    if (!this.props.showTryAgain) {
      return null;
    }

    return (
      <a
        onClick={() => this.reset()}
        role="button"
        tabIndex="-1"
      >
        Try again
      </a>
    );
  }

  render() {
    return (
      <div>
        {this.renderPhoneNumberForm()}
        {this.renderCodeForm()}
        {this.renderError()}
        {this.renderLoading()}
        {this.renderTryAgain()}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  status: selectors.statusSelector,
  confirmationResult: selectors.confirmationResultSelector,
  error: selectors.errorSelector,
});

const mapDispatchToProps = {
  ...actions,
  updateProfile: authActions.updateProfile,
};

export default R.compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({ status }) => ({
    showPhoneNumberForm: R.contains(status, [
      STATUS_IDLE,
      STATUS_SMS_SEND_STARTED,
      STATUS_SMS_SEND_FAILED,
    ]),
    showCodeForm: R.contains(status, [
      STATUS_SMS_SEND_SUCCEEDED,
      STATUS_CODE_VALIDATION_STARTED,
      STATUS_CODE_VALIDATION_SUCCEEDED,
      STATUS_CODE_VALIDATION_FAILED,
    ]),
    showError: R.contains(status, [
      STATUS_SMS_SEND_FAILED,
      STATUS_CODE_VALIDATION_FAILED,
    ]),
    showLoading: R.contains(status, [
      STATUS_SMS_SEND_STARTED,
      STATUS_CODE_VALIDATION_STARTED,
    ]),
    showTryAgain: R.contains(status, [
      STATUS_CODE_VALIDATION_FAILED,
    ]),
  })),
)(WithPhoneNumber);
