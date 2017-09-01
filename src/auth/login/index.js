import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
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
    authError: PropTypes.object,
    with: PropTypes.oneOf([
      'password',
      'google',
    ]).isRequired,
  };

  static defaultProps = {
    authError: {},
  };

  handleSuccess = () => {
    this.setState({ isLoading: false });
    // this is where you can redirect to another route
  }

  handleError = (error) => {
    this.setState({ isLoading: false });
    console.log('there was an error', error);
    console.log('error prop:', this.props.authError); // thanks to connect
  }

  render() {
    const { with: withName, firebase } = this.props;
    const LoginComponent = loginComponentMap[withName];

    return (
      <LoginComponent
        login={firebase.login}
        onSuccess={this.handleSuccess}
        onError={this.handleError}
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
