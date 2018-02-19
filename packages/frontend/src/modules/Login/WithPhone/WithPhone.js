/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { connect } from 'react-redux';
import { withStateHandlers, withProps } from 'recompose';
import { actions as authActions } from 'store/firebase/auth';
import { actions as loginActions } from 'store/login';
import PhoneNumber from './PhoneNumber/PhoneNumber';
import SmsCodeValidation from './SmsCodeValidation/SmsCodeValidation';

type Props = {
  step: 'phoneNumber' | 'smsCodeValidation' | null,
  onStepChange: Function,
  onSuccess: Function,
  values: Object,
  showPhoneNumber: boolean,
  showSmsCodeValidation: boolean,
  setValues: Function,
  resetValues: Function,
  login: Function,
  validateSmsCode: Function,
};

export class LoginWithPhone extends Component<Props> {
  static defaultProps = {
    onStepChange: noop,
  };

  confirmationResult = noop;

  handleSubmitPhoneNumber = async (values, recaptcha) => {
    const { login, setValues, onStepChange } = this.props;
    const credentials = {
      phoneNumber: values.phoneNumber,
      applicationVerifier: recaptcha.verifier,
    };
    this.confirmationResult = await login(credentials);

    setValues(values);
    onStepChange('smsCodeValidation');
  };

  handleSubmitSmsCodeValidation = async values => {
    await this.props.validateSmsCode(values.code, this.confirmationResult);
    this.props.onSuccess();
  };

  handleBackToPhoneNumber = () => {
    this.props.onStepChange('phoneNumber');
  };

  render() {
    const { values, showPhoneNumber, showSmsCodeValidation } = this.props;
    const smsCodeValidation = showSmsCodeValidation ? (
      <SmsCodeValidation
        key="smsCodeValidation"
        {...values}
        onSubmit={this.handleSubmitSmsCodeValidation}
        onBackClick={this.handleBackToPhoneNumber}
      />
    ) : null;

    return [
      <PhoneNumber
        key="phoneNumber"
        hidden={!showPhoneNumber}
        onSubmit={this.handleSubmitPhoneNumber}
      />,
      smsCodeValidation,
    ];
  }
}

const initialState = {
  values: {},
};

const mapDispatchToProps = {
  login: loginActions.loginWithPhoneNumber,
  validateSmsCode: authActions.validateSmsCode,
};

export default R.compose(
  connect(null, mapDispatchToProps),
  withStateHandlers(initialState, {
    setValues: () => values => ({ values }),
    resetValues: () => R.always(initialState),
  }),
  withProps(({ step }) => ({
    showPhoneNumber: R.either(R.isNil, R.equals('phoneNumber'))(step),
    showSmsCodeValidation: R.either(R.isNil, R.equals('smsCodeValidation'))(
      step,
    ),
  })),
)(LoginWithPhone);
