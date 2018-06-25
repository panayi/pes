import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import propSelector from '@pesposa/core/src/utils/propSelector';
import { selectors, actions as modalActions } from '../../../store/modals';
import DialogTitle from '../BaseModal/Title/Title';
import BaseModal from '../BaseModal/BaseModal';

class ReduxModal extends React.Component {
  constructor(props) {
    super(props);
    const { closeModal } = props;
    this.dialogTitle = withProps({ onClose: closeModal })(DialogTitle);
  }

  render() {
    const {
      contentProps,
      contentPropsFromState,
      closeModal,
      ...rest
    } = this.props;
    const finalContentProps = {
      ...contentProps,
      closeModal,
    };

    return (
      <BaseModal
        contentProps={finalContentProps}
        dialogTitle={this.dialogTitle}
        onClose={closeModal}
        {...rest}
      />
    );
  }
}

const openSelector = createSelector(
  selectors.openSelector,
  propSelector(['open']),
  R.compose(
    R.defaultTo(false),
    R.or,
  ),
);

const mapStateToProps = createStructuredSelector({
  contentPropsFromState: selectors.contentPropsSelector,
  open: openSelector,
});

const mapDispatchToProps = (dispatch, { id }) =>
  bindActionCreators(
    {
      closeModal: () => modalActions.closeModal(id),
    },
    dispatch,
  );

export default R.compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withProps(({ contentPropsFromState, contentProps }) => ({
    contentProps: R.merge(contentPropsFromState, contentProps),
  })),
)(ReduxModal);
