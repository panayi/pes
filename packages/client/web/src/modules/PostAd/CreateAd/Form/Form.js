import * as R from 'ramda';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  actions as postAdActions,
  selectors as postAdSelectors,
} from '@pesposa/client-core/src/store/postAd';
import requireUserToCallAction from '@pesposa/client-core/src/hocs/requireUserToCallAction';
import AdFormModal from '@pesposa/client-core/src/modules/AdForm/Modal/Modal';

const mapStateToProps = createStructuredSelector({
  filesPath: postAdSelectors.draftImagesPathSelector,
});

const mapDispatchToProps = {
  onChange: postAdActions.saveDraft,
  onSubmit: postAdActions.createAd,
};

export default R.compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withProps({
    title: 'Sell on Pesposa',
    submitButtonLabel: 'Post Ad',
  }),
  requireUserToCallAction('onSubmit'),
)(AdFormModal);
