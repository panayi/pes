/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withState, branch, renderComponent } from 'recompose';
import { modelConnections, connectData } from 'services/connectData';
import { actions, selectors } from 'store/ad';
import { createStructuredSelector } from 'reselect';
import { Button } from 'material-ui';
import { uidSelector } from 'store/auth/selectors';
import { factory as modalFactory } from 'store/modals';
import pickProps from 'utils/pickProps';
import withAnonymousUser from 'components/hocs/withAnonymousUser';
import requireUserToCallAction from 'components/hocs/requireUserToCallAction';
import Modal from 'components/molecules/ModalProvider/Modal';
import AdForm from 'components/molecules/AdForm';
import CreateAdSuccess from './Success';

const mapDataToProps = {
  ad: modelConnections.pendingAds.one(uidSelector),
};

const mapStateToProps = createStructuredSelector({
  filesPath: selectors.pendingAdImagesPathSelector,
});

const mapDispatchToProps = {
  onChange: actions.savePendingAd,
  createAd: actions.createAd,
};

const connector = connectData(
  mapDataToProps,
  mapStateToProps,
  mapDispatchToProps,
);

const CreateAdContent = R.compose(
  branch(R.prop('didCreateAd'), renderComponent(CreateAdSuccess)),
  withAnonymousUser,
  connector,
  pickProps(['ad', 'filesPath', 'onChange']),
)(AdForm);

const CreateAdActions = ({
  ad,
  createAd,
  hideModal,
  didCreateAd,
  setDidCreateAd,
}) =>
  didCreateAd ? (
    <Button onClick={hideModal}>Close</Button>
  ) : (
    <Button onClick={() => createAd(ad, () => setDidCreateAd(true))}>
      Post Ad
    </Button>
  );

const ConnectedCreateAdActions = R.compose(
  connector,
  requireUserToCallAction('createAd'),
)(CreateAdActions);

const CustomModal = withState('didCreateAd', 'setDidCreateAd', false)(Modal);

export default modalFactory({
  modal: CustomModal,
  content: CreateAdContent,
  actions: ConnectedCreateAdActions,
});
