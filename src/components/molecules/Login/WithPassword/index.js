import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Input, Button, Typography } from 'material-ui';
import { authErrorSelector } from 'store/auth/selectors';
import { authErrorPropType } from 'utils/propTypes';
import withLogin from '../withLogin';

class LoginWithPassword extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    authError: authErrorPropType,
  };

  static defaultProps = {
    authError: {},
  };

  state = {
    email: '',
    password: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const { login } = this.props;

    return login({ email, password });
  };

  render() {
    const { email, password } = this.state;
    const { authError } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          placeholder="Email"
          name="email"
          label="Email"
          value={email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        <Button icon="sign in">Login</Button>
        <Typography>{authError && authError.message}</Typography>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  authError: authErrorSelector,
});

export default R.compose(withLogin, connect(mapStateToProps))(
  LoginWithPassword,
);
