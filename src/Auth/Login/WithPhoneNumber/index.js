/* @flow */
import React, { Component } from 'react';
import R from 'ramda';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, Control } from 'react-redux-form';
import PhoneInput from 'react-phone-input';
import { Button } from 'rebass';
import { Helmet } from 'react-helmet';
import generateClassName from '../../../lib/helpers/generateClassName';
import {
  type PhoneNumberValues,
  type CodeValues,
} from './withPhoneNumber';
import * as actions from './withPhoneNumber.actions';
import * as selectors from './withPhoneNumber.selectors';

type Props = {
  status: String,
  confirmationResult: Object,
  error: Object,
  reset: Function,
  submitPhoneNumberForm: Function,
  submitCodeForm: Function,
  firebase: Object,
  showPhoneNumberForm: Boolean,
  showCodeForm: Boolean,
  showError: Boolean,
  showLoading: Boolean,
  showTryAgain: Boolean,
};

export const INITIAL_STATE = {
  phoneNumber: '',
  code: '',
};

export const MODEL_KEY = 'phoneNumberLogin';
export const MODEL_PATH = `forms.${MODEL_KEY}`;

export class WithPhoneNumber extends Component<Props> {
  static BUTTON_ID: String = generateClassName();

  componentDidMount() {
    this.reset();
  }

  recaptchaVerifier: Object

  reset() {
    this.props.reset();
    // FIXME: Timeout needed to
    // solve an error when clicking tryAgain
    setTimeout(() => {
      this.createRecaptcha();
    }, 100);
  }

  createRecaptcha = () => {
    const { RecaptchaVerifier } = this.props.firebase.auth;
    this.recaptchaVerifier = new RecaptchaVerifier(WithPhoneNumber.BUTTON_ID, {
      size: 'invisible',
    });
  }

  renderPhoneNumberForm() {
    if (!this.props.showPhoneNumberForm) {
      return null;
    }

    return (
      <Form
        model={MODEL_PATH}
        onSubmit={(values: PhoneNumberValues) =>
          this.props.submitPhoneNumberForm(values, this.recaptchaVerifier)
        }
      >
        <Control.text
          component={PhoneInput}
          defaultCountry="cy"
          model="forms.phoneNumberLogin.phoneNumber"
          placeholder="Enter phone number"
          validators={{
            required: (val: String) => val && val.length,
          }}
        />
        <Button
          id={WithPhoneNumber.BUTTON_ID}
          type="submit"
        >
          Sign in with phone number
        </Button>
      </Form>
    );
  }

  renderCodeForm() {
    if (!this.props.showCodeForm) {
      return null;
    }

    return (
      <Form
        model={MODEL_PATH}
        onSubmit={(values: CodeValues) => this.props.submitCodeForm(values)}
      >
        <Control.text
          model="forms.phoneNumberLogin.code"
          placeholder="Enter SMS code"
        />
        <Button
          id={WithPhoneNumber.BUTTON_ID}
          type="submit"
        >
          Submit
        </Button>
      </Form>
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

    return (
      <span>
        loading
      </span>
    );
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
        <Helmet>
          <script src="https://www.google.com/recaptcha/api.js" async defer />
        </Helmet>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  status: selectors.statusSelector,
  confirmationResult: selectors.confirmationResultSelector,
  error: selectors.errorSelector,
  showPhoneNumberForm: selectors.showPhoneNumberFormSelector,
  showCodeForm: selectors.showCodeFormSelector,
  showError: selectors.showErrorSelector,
  showLoading: selectors.showLoadingSelector,
  showTryAgain: selectors.showTryAgainSelector,
});

const mapDispatchToProps = {
  reset: actions.reset,
  submitPhoneNumberForm: actions.submitPhoneNumberForm,
  submitCodeForm: actions.submitCodeForm,
};

export default R.compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(WithPhoneNumber);
