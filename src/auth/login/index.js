import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Form, Message, Grid } from 'semantic-ui-react';
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

  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value,
    });
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
    const { email, password, loginMessage } = this.state;

    return (
      <Grid
        verticalAlign="middle"
        centered
        columns={1}
        textAlign="center"
        relaxed
        className="full-height"
      >
        <Grid.Row>
          <Grid.Column tablet={10} mobile={16} computer={6}>
            <Form
              onSubmit={this.handleSubmit}
              error={loginMessage}
            >
              {loginMessage &&
                <Message
                  error
                  content={loginMessage}
                />}
              <Form.Input
                placeholder="Email"
                name="email"
                label="Email"
                value={email}
                onChange={this.handleChange}
              />
              <Form.Input
                placeholder="Password"
                type="password"
                name="password"
                label="Password"
                value={password}
                onChange={this.handleChange}
              />
              <Form.Button
                content="Login"
                icon="sign in"
                floated="right"
              />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default R.compose(
  firebaseConnect(),
  connect(({ firebase: { authError } }) => ({
    authError,
  })),
)(Login);
