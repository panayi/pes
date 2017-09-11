/* @flow */
import React, { Component } from 'react';
import R from 'ramda';
import { isLoaded } from 'react-redux-firebase';
import { branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { profileSelector } from '../auth.selectors';
import { actions, linkedAccountsSelector } from './link';
import LinkButton from './LinkButton';

type Props = {
  children: React$Node,
  fetchLinkedAccounts: Function,
  linkedAccounts: Array<String>,
};

export class Link extends Component<Props> {
  componentWillMount() {
    this.props.fetchLinkedAccounts();
  }

  render() {
    if (R.isNil(this.props.linkedAccounts)) {
      return null;
    }

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  profile: profileSelector,
  linkedAccounts: linkedAccountsSelector,
});

const mapDispatchToProps = {
  fetchLinkedAccounts: actions.fetchLinkedAccounts,
};

const ConnectedLink = R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  // Render only when `profile` has been fetched,
  // as the profile.email is needed for fetching linked-accounts.
  branch(
    R.compose(
      R.not,
      isLoaded,
      R.prop('profile'),
    ),
    renderNothing,
  ),
)(Link);

ConnectedLink.Button = LinkButton;

export default ConnectedLink;
