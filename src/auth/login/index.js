import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Flex, Box, Input, Button } from 'rebass';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

export class Login extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
    }).isRequired,
    authError: PropTypes.string,
  };

  static defaultProps = {
    authError: '',
  };

  state = {
    email: '',
    password: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    return this.props.firebase
      .login({ email, password })
      .then(() => {
        this.setState({ isLoading: false });
        // this is where you can redirect to another route
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.log('there was an error', error);
        console.log('error prop:', this.props.authError); // thanks to connect
      });
  }

  render() {
    const { email, password } = this.state;

    return (
      <Flex
        align="center"
        justify="center"
        style={{ height: '100vh' }}
      >
        <Box>
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
        </Box>
      </Flex>
    );
  }
}

export default R.compose(
  firebaseConnect(),
  connect(({ firebase: { authError } }) => ({
    authError,
  })),
)(Login);
