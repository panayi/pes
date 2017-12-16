// @flow weak
import React from 'react';
import * as R from 'ramda';
import { withProps } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Dialog, DialogTitle, DialogContent, DialogActions } from 'material-ui';
import { selectors, actions as modalActions } from 'store/modals';

type ModalProps = {
  title: String, // eslint-disable-line react/no-unused-prop-types
};

type Props = {
  content: React$Component<*>,
  actions: React$Component<*>,
  modalProps: ModalProps,
  isOpen: boolean,
  hideModal: Function,
};

const Modal = (props: Props) => {
  const {
    content: Content,
    actions: Actions,
    modalProps,
    isOpen,
    hideModal,
    ...rest
  } = props;
  // Pick more props as needed.
  // Dialog props: https://material-ui-next.com/api/dialog/
  const dialogProps = R.pick(['onExited'], modalProps);
  const { title } = modalProps;
  const componentProps = {
    ...rest,
    ...modalProps,
    hideModal,
  };

  return (
    <Dialog
      key="1"
      open={isOpen}
      onRequestClose={hideModal}
      ignoreEscapeKeyUp
      {...dialogProps}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {Content && <Content {...componentProps} />}
      </DialogContent>
      {Actions && (
        <DialogActions>
          <Actions {...componentProps} />
        </DialogActions>
      )}
    </Dialog>
  );
};

const mapStateToProps = createStructuredSelector({
  content: selectors.componentForContentSelector,
  actions: selectors.componentForActionsSelector,
  modalProps: selectors.modalPropsSelector,
  isOpen: selectors.isOpenSelector,
});

const mapDispatchToProps = {
  hideModal: modalActions.hideModal,
};

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({ id, hideModal }) => ({
    hideModal: () => hideModal(id),
  })),
)(Modal);
