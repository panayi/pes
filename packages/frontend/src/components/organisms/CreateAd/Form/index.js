/* @flow */
import * as R from 'ramda';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  actions as postAdActions,
  selectors as postAdSelectors,
} from 'store/postAd';
import requireUserToCallAction from 'components/hocs/requireUserToCallAction';
import AdForm from 'components/molecules/AdForm';

const mapStateToProps = createStructuredSelector({
  filesPath: postAdSelectors.draftAdImagesPathSelector,
});

const mapDispatchToProps = {
  onChange: postAdActions.saveDraft,
  onSubmit: postAdActions.createAd,
};

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps({
    submitButtonLabel: 'Post Ad',
  }),
  requireUserToCallAction('onSubmit'),
)(AdForm);