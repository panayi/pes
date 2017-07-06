import React, { Component } from 'react';
import { login, resetPassword } from '../auth';

const setErrorMsg = error => ({
  loginMessage: error,
});

export default class Login extends Component {
  state = {
    loginMessage: null,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    login(this.email.value, this.pw.value)
      .catch(() => {
        this.setState(setErrorMsg('Invalid username/password.'));
      });
  }

  resetPassword = (e) => {
    e.stopPropagation();
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch(() => this.setState(setErrorMsg('Email address not found.')));
  }

  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="loginEmail">Email</label>
            <input
              id="loginEmail"
              className="form-control"
              ref={(email) => { this.email = email; }}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="loginPassword">Password</label>
            <input
              type="password"
              id="loginPassword"
              className="form-control"
              placeholder="Password"
              ref={(pw) => { this.pw = pw; }}
            />
          </div>
          {
            this.state.loginMessage &&
            <div className="alert alert-danger" role="alert">
              <span
                className="glyphicon glyphicon-exclamation-sign"
                aria-hidden="true"
              />
              <span className="sr-only">Error:</span>{' '}
              {this.state.loginMessage}{' '}
              <button
                onClick={this.resetPassword}
                className="alert-link"
              >
                Forgot Password?
              </button>
            </div>
          }
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}
