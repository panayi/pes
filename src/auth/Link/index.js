/* @flow */
import React, { Component } from 'react';
import * as R from 'ramda';
import { branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { isProfileLoadedSelector } from '../auth.selectors';
import { actions, linkedAccountsSelector } from './link';
import LinkButton from './LinkButton';
import LinkButtons from './LinkButtons';

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
  isProfileLoaded: isProfileLoadedSelector,
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
      R.prop('isProfileLoaded'),
    ),
    renderNothing,
  ),
)(Link);

ConnectedLink.Button = LinkButton;
ConnectedLink.Buttons = LinkButtons;

export default ConnectedLink;
