/* @flow */
import React from 'react';
import * as R from 'ramda';
import { withState } from 'recompose';
import { modelConnections, connectData } from 'services/connectData';
import { actions, selectors } from 'store/ad';
import { createStructuredSelector } from 'reselect';
import { Button } from 'material-ui';
import { uidSelector } from 'store/auth/selectors';
import { factory as modalFactory } from 'store/modals';
import pickProps from 'utils/pickProps';
import withAnonymousUser from 'components/hocs/withAnonymousUser';
import requireUserToCallAction from 'components/hocs/requireUserToCallAction';
import AdForm from 'components/molecules/AdForm';

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
  withAnonymousUser,
  withState('created', 'setCreated', false),
  connector,
  pickProps(['ad', 'filesPath', 'onChange']),
)(AdForm);

const CreateAdActions = ({ ad, createAd, hideModal }) => (
  <Button onClick={() => createAd(ad, hideModal)}>Post Ad</Button>
);

const ConnectedCreateAdActions = R.compose(
  connector,
  requireUserToCallAction('createAd'),
)(CreateAdActions);

export default modalFactory({
  content: CreateAdContent,
  actions: ConnectedCreateAdActions,
});
