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

const CreateAdActions = connector(({ ad, createAd }) => [
  <Button key={0} onClick={() => createAd(ad)}>
    Ad
  </Button>,
]);

export default modalFactory({
  content: CreateAdContent,
  actions: CreateAdActions,
});
