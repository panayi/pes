import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { firebaseConnect } from 'react-redux-firebase';
import { authErrorPropType } from '../../lib/helpers/propTypes';
import { authErrorSelector, maybeMergeAnonymousProfile } from '../auth';
import WithPassword from './WithPassword';
import WithGoogle from './WithGoogle';

const loginComponentMap = {
  password: WithPassword,
  google: WithGoogle,
  anonymousUser: Object,
};

export class Login extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
    }).isRequired,
    authError: authErrorPropType,
    with: PropTypes.oneOf([
      'password',
      'google',
    ]).isRequired,
    maybeMergeAnonymousProfile: PropTypes.func.isRequired,
  };

  static defaultProps = {
    authError: {},
  };

  handleSuccess = () => {
    this.props.maybeMergeAnonymousProfile();
  }

  handleError = () => {
  }

  render() {
    const { with: withName, firebase, authError } = this.props;
    const LoginComponent = loginComponentMap[withName];

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
