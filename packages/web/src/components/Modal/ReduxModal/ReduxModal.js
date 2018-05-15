import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectors, actions as modalActions } from 'store/modals';
import DialogTitle from '../BaseModal/Title/Title';
import BaseModal from '../BaseModal/BaseModal';

class ReduxModal extends React.Component {
  constructor(props) {
    super(props);
    const { closeModal } = props;
    this.dialogTitle = withProps({ onClose: closeModal })(DialogTitle);
  }

  render() {
    const { contentProps, closeModal, ...rest } = this.props;
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

const mapStateToProps = createStructuredSelector({
  contentPropsFromState: selectors.contentPropsSelector,
  open: selectors.openSelector,
});

const mapDispatchToProps = (dispatch, { id }) =>
  bindActionCreators(
    {
      closeModal: () => modalActions.closeModal(id),
    },
    dispatch,
  );

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({ contentPropsFromState, contentProps }) => ({
    contentProps: R.merge(contentPropsFromState, contentProps),
  })),
)(ReduxModal);
