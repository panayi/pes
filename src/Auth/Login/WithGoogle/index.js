import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rebass';

export default class WithGoogle extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Button
        onClick={() => this.props.login({ provider: 'google' })}
      >
        Sign in with Google
      </Button>
    );
  }
}
