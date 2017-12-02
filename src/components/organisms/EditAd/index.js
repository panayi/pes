/* @flow */
import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { withProps } from 'recompose';
import { Button } from 'material-ui';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions, selectors } from 'store/ad';
import { factory as modalFactory } from 'store/modals';
import pickProps from 'utils/pickProps';
import AdForm from 'components/molecules/AdForm';

type Props = {
  filesPath: String,
  adId: string, // eslint-disable-line react/no-unused-prop-types
  ad: Ad,
};

const mapDispatchToProps = (dispatch: Dispatch, props: Props) =>
  bindActionCreators(
    {
      saveAd: actions.saveAd(props.adId, props.onSave),
    },
    dispatch,
  );

const EditAdContent = R.compose(
  withProps(
    createStructuredSelector({
      filesPath: selectors.adImagesPathSelector,
    }),
  ),
  pickProps(['ad', 'filesPath']),
)(AdForm);

const EditAdActions = connect(null, mapDispatchToProps)(({ ad, saveAd }) => [
  <Button key={0} onClick={() => saveAd(ad)}>
    Save
  </Button>,
]);

export default modalFactory({
  content: EditAdContent,
  actions: EditAdActions,
});
