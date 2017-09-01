import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { authErrorPropType } from '../../lib/helpers/propTypes';
import WithPassword from './WithPassword';
import WithGoogle from './WithGoogle';

const loginComponentMap = {
  password: WithPassword,
  google: WithGoogle,
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
  };

  static defaultProps = {
    authError: {},
  };

  handleSuccess = () => {
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

export default R.compose(
  firebaseConnect(),
  connect(({ firebase: { authError } }) => ({
    authError,
  })),
)(Login);
