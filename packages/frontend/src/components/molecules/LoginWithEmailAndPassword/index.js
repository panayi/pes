import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { selectors as authSelectors } from 'store/firebase/auth';
import withLoginAction from 'components/hocs/withLoginAction';

class LoginWithEmailAndPassword extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
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
  authError: authSelectors.authErrorSelector,
});

export default R.compose(withLoginAction, connect(mapStateToProps))(
  LoginWithEmailAndPassword,
);
