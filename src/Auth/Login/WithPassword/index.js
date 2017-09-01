import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'rebass';

export default class WithPassword extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    const { login, onSuccess, onError } = this.props;

    return login({ email, password })
      .then(onSuccess)
      .catch(onError);
  }

  render() {
    const { email, password } = this.state;

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
        <Button
          icon="sign in"
          floated="right"
        >
          Login
        </Button>
      </form>
    );
  }
}
