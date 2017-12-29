/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { isProfileLoadedSelector } from 'store/auth/selectors';
import * as actions from 'store/auth/linkedAccounts/actions';
import { linkedAccountsSelector } from 'store/auth/linkedAccounts/selectors';
import LinkButton from './LinkButton';
import LinkButtons from './LinkButtons';

type Props = {
  children: React$Node,
  fetchLinkedAccounts: Function,
  linkedAccounts: Array<String>,
};

export class LinkAccount extends Component<Props> {
  componentWillMount() {
    this.props.fetchLinkedAccounts();
  }

  render() {
    if (R.isNil(this.props.linkedAccounts)) {
      return null;
    }

    return <div>{this.props.children}</div>;
  }
}

const mapStateToProps = createStructuredSelector({
  isProfileLoaded: isProfileLoadedSelector,
  linkedAccounts: linkedAccountsSelector,
});

const mapDispatchToProps = {
  fetchLinkedAccounts: actions.fetchLinkedAccounts,
};

const ConnectedLinkAccount = R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  // Render only when `profile` has been fetched,
  // as the profile.email is needed for fetching linked-accounts.
  branch(R.compose(R.not, R.prop('isProfileLoaded')), renderNothing),
)(LinkAccount);

ConnectedLinkAccount.Button = props => (
  <ConnectedLinkAccount>
    <LinkButton {...props} />
  </ConnectedLinkAccount>
);
ConnectedLinkAccount.Buttons = () => (
  <ConnectedLinkAccount>
    <LinkButtons />
  </ConnectedLinkAccount>
);

export default ConnectedLinkAccount;
