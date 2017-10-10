/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import capitalize from 'lodash.capitalize';
import { withProps } from 'recompose';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'rebass';
import createAuthProvider from '../../helpers/createAuthProvider';
import { auth as authConfig } from '../../../lib/config';
import { actions, linkedAccountsSelector } from '../link';
import { actions as authActions } from '../../auth';

type Props = {
  getProvider: Function,
  withProvider: String,
  providerLabel: String,
  firebase: Object,
  fetchLinkedAccounts: Function,
  updateProfile: Function,
  disabled: Boolean,
  linkedAccounts: Array<String>,
};

export class LinkButton extends Component<Props> {
  handleClick = () => {
    const { firebase, withProvider, fetchLinkedAccounts, updateProfile } = this.props;
    const provider = createAuthProvider(
      firebase,
      withProvider,
      authConfig[withProvider].scopes,
    );

    firebase.auth().currentUser
      .linkWithPopup(provider)
      .then((result) => {
        updateProfile(result.user);
        fetchLinkedAccounts();
      });
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
  updateProfile: authActions.updateProfile,
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
