/* @flow */
import * as R from 'ramda';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions, selectors } from 'store/ads';
import withAnonymousUser from 'components/hocs/withAnonymousUser';
import requireUserToCallAction from 'components/hocs/requireUserToCallAction';
import AdForm from 'components/molecules/AdForm';

const mapStateToProps = createStructuredSelector({
  filesPath: selectors.pendingAdImagesPathSelector,
});

const mapDispatchToProps = {
  onChange: actions.savePendingAd,
  onSubmit: actions.createAd,
};

export default R.compose(
  withAnonymousUser,
  connect(mapStateToProps, mapDispatchToProps),
  withProps({
    submitButtonLabel: 'Post Ad',
  }),
  requireUserToCallAction('onSubmit'),
)(AdForm);
