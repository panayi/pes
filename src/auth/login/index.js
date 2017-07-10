import React, { Component } from 'react';
import { Form, Message, Grid } from 'semantic-ui-react';
import { login, resetPassword } from '../auth';

const setErrorMsg = error => ({
  loginMessage: error,
});

export default class Login extends Component {
  state = {
    loginMessage: null,
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
    login(email, password)
      .catch(() => {
        this.setState(setErrorMsg('Invalid username/password.'));
      });
  }

  resetPassword = (e) => {
    e.stopPropagation();
    resetPassword(this.state.email)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.state.email}.`)))
      .catch(() => this.setState(setErrorMsg('Email address not found.')));
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
