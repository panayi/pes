/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import capitalize from 'lodash.capitalize';
import { withProps } from 'recompose';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'material-ui';
import createAuthProvider from 'lib/firebase/createAuthProvider';
import authConfig from 'config/auth';
import { actions as userActions } from 'store/user';
import * as actions from 'store/auth/linkedAccounts/actions';
import { linkedAccountsSelector } from 'store/auth/linkedAccounts/selectors';

type Props = {
  withProvider: String,
  providerLabel: String,
  firebase: Object,
  fetchLinkedAccounts: Function,
  setProfile: Function,
  disabled: Boolean,
};

export class LinkButton extends Component<Props> {
  handleClick = () => {
    const {
      firebase,
      withProvider,
      fetchLinkedAccounts,
      setProfile,
    } = this.props;
    const provider = createAuthProvider(
      firebase,
      withProvider,
      authConfig[withProvider].scopes,
    );

    firebase
      .auth()
      .currentUser.linkWithPopup(provider)
      .then(result => {
        setProfile(result.user);
        fetchLinkedAccounts();
      });
  };

  render() {
    const { providerLabel, disabled } = this.props;

    return (
      <Button onClick={this.handleClick} disabled={disabled}>
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
  setProfile: userActions.setProfile,
};

const isDisabled = R.converge(R.contains, [
  R.compose(R.prop(R.__, mapToLinkedAccount), R.prop('withProvider')),
  R.compose(R.defaultTo([]), R.prop('linkedAccounts')),
]);

export default R.compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
  withProps(props => ({
    disabled: isDisabled(props),
    providerLabel: capitalize(props.withProvider),
  })),
)(LinkButton);
