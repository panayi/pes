/* @flow */
import React from 'react';
import * as R from 'ramda';
import { noop } from 'ramda-adjunct';
import { setDisplayName } from 'recompose';
import { factory as modalFactory } from 'store/modals';
import Login from 'components/molecules/Login';
import WithPhoneNumber from 'components/molecules/Login/WithPhoneNumber';
import WithFacebook from 'components/molecules/Login/WithFacebook';

type Props = {
  hideModal: Function,
  onSuccess: ?Function,
  renderContent: Function,
};

const LoginModal = ({ hideModal, onSuccess, renderContent }: Props) =>
  renderContent(
    <Login
      onSuccess={() => {
        hideModal();
        onSuccess();
      }}
    >
      <WithPhoneNumber />
      <WithFacebook />
    </Login>,
  );

LoginModal.defaultProps = {
  onSuccess: noop,
};

const ConnectedLoginModal = R.compose(setDisplayName('LoginModal'))(LoginModal);

export default modalFactory({
  content: ConnectedLoginModal,
});
