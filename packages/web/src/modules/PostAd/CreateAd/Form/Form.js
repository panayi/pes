/* @flow */
import * as R from 'ramda';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  actions as postAdActions,
  selectors as postAdSelectors,
} from 'store/postAd';
import requireUserToCallAction from 'hocs/requireUserToCallAction';
import AdForm from '../../AdForm/AdForm';

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
    title: 'What are you selling?',
    submitButtonLabel: 'Post Ad',
  }),
  requireUserToCallAction('onSubmit'),
)(AdForm);
