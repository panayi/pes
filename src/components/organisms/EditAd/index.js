/* @flow */
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions, selectors } from 'store/ads';
import { factory as modalFactory } from 'store/modals';
import AdForm from 'components/molecules/AdForm';

type Props = {
  filesPath: String,
  adId: string,
  ad: Ad,
};

const mapStateToProps = createStructuredSelector({
  filesPath: selectors.adImagesPathSelector,
});

const mapDispatchToProps = (dispatch: Dispatch, props: Props) =>
  bindActionCreators(
    {
      onSubmit: actions.saveAd(props.adId, props.onSave),
    },
    dispatch,
  );

const EditAdContent = R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps({
    submitButtonLabel: 'Save',
  }),
)(AdForm);

export default modalFactory({
  content: EditAdContent,
});
