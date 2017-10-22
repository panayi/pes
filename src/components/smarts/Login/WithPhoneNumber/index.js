/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, Control } from 'react-redux-form';
import PhoneInput from 'react-telephone-input';
import { Button } from 'material-ui';
import Recaptcha from 'components/atoms/Recaptcha';
import { actions, selectors } from 'store/auth/withPhoneNumber';
import {
  type PhoneNumberValues,
  type CodeValues,
} from 'store/auth/withPhoneNumber/flowtypes';

type Props = {
  status: String,
  confirmationResult: Object,
  error: Object,
  resetAll: Function,
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
  componentWillMount() {
    this.props.resetAll();
  }

  recaptcha: ?Object

  renderPhoneNumberForm() {
    if (!this.props.showPhoneNumberForm) {
      return null;
    }

    return (
      <Form
        model={MODEL_PATH}
        onSubmit={(values: PhoneNumberValues) =>
          this.props.submitPhoneNumberForm(values, this.recaptcha || {})
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
        <Button type="submit">
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
        <Button type="submit">
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
        onClick={() => this.props.resetAll(this.recaptcha)}
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
        <Recaptcha
          firebase={this.props.firebase}
          ref={(instance) => { this.recaptcha = instance; }}
        />
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
  resetAll: actions.resetAll,
  submitPhoneNumberForm: actions.submitPhoneNumberForm,
  submitCodeForm: actions.submitCodeForm,
};

export default R.compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(WithPhoneNumber);
