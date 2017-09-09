/* @flow */
import React, { Component } from 'react';
import R from 'ramda';
import capitalize from 'lodash.capitalize';
import { withProps } from 'recompose';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'rebass';
import { createAuthProvider } from '../../../lib/helpers/firebase';
import { auth as authConfig } from '../../../lib/config';
import { actions, linkedAccountsSelector } from '../link';

type Props = {
  getProvider: Function,
  withProvider: String,
  providerLabel: String,
  firebase: Object,
  fetchLinkedAccounts: Function,
  disabled: Boolean,
  linkedAccounts: Array<String>,
};

export class LinkButton extends Component<Props> {
  handleClick = () => {
    const { firebase, withProvider, fetchLinkedAccounts } = this.props;
    const provider = createAuthProvider(
      firebase,
      withProvider,
      authConfig[withProvider].scopes,
    );

    firebase.auth().currentUser
      .linkWithPopup(provider)
      .then(() => fetchLinkedAccounts());
  }

  render() {
    const { providerLabel, disabled } = this.props;

    return (
      <Button
        onClick={this.handleClick}
        disabled={disabled}
      >
        Link with {providerLabel}
      </Button>
    );
  }
}

const mapToLinkedAccount = {
  facebook: 'facebook.com',
  google: 'google.com',
};

const mapStateToProps = createStructuredSelector({
  linkedAccounts: linkedAccountsSelector,
});

const mapDispatchToProps = {
  fetchLinkedAccounts: actions.fetchLinkedAccounts,
};

const isDisabled = R.converge(R.contains, [
  R.compose(
    R.prop(R.__, mapToLinkedAccount),
    R.prop('withProvider'),
  ),
  R.compose(
    R.defaultTo([]),
    R.prop('linkedAccounts'),
  ),
]);

export default R.compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
  withProps(props => ({
    disabled: isDisabled(props),
    providerLabel: capitalize(props.withProvider),
  })),
)(LinkButton);
