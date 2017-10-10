/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { firebaseConnect } from 'react-redux-firebase';
import { authErrorSelector, maybeMergeAnonymousProfile } from '../auth';

type Props = {
  firebase: Object,
  authError: Object,
  component: React$ElementType,
  maybeMergeAnonymousProfile: Function,
};

export class Login extends Component<Props> {
  static defaultProps = {
    authError: {},
  };

  handleSuccess = () => {
    this.props.maybeMergeAnonymousProfile();
  }

  handleError = (error: Object) => {
    console.error(error); // eslint-disable-line no-console
  }

  render() {
    const { component: LoginComponent, firebase, authError } = this.props;

    return (
      <LoginComponent
        login={firebase.login}
        onSuccess={this.handleSuccess}
        onError={this.handleError}
        authError={authError}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  authError: authErrorSelector,
});

const mapDispatchToProps = {
  maybeMergeAnonymousProfile,
};

export default R.compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(Login);
