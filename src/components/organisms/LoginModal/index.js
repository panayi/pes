/* @flow */
import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { setDisplayName } from 'recompose';
import { actions as modalActions, factory as modalFactory } from 'store/modals';
import Login from 'components/molecules/Login';
import WithPhoneNumber from 'components/molecules/Login/WithPhoneNumber';
import WithFacebook from 'components/molecules/Login/WithFacebook';

type Props = {
  hideModal: Function,
};

const LoginModal = ({ hideModal }: Props) => (
  <Login onSuccess={() => hideModal()}>
    <WithPhoneNumber />
    <WithFacebook />
  </Login>
);

const actions = {
  hideModal: modalActions.hideModal,
};

const ConnectedLoginModal = R.compose(
  connect(null, actions),
  setDisplayName('LoginModal'),
)(LoginModal);

export default modalFactory({
  content: ConnectedLoginModal,
});
