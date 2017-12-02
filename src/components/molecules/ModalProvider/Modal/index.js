// @flow weak
import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Dialog, DialogTitle, DialogContent, DialogActions } from 'material-ui';
import { selectors, actions as modalActions } from 'store/modals';

type ModalProps = {
  title: String, // eslint-disable-line react/no-unused-prop-types
  actions: Function, // eslint-disable-line react/no-unused-prop-types
};

type Props = {
  content: React$Component<*>,
  modalProps: ModalProps,
  isOpen: boolean,
  hideModal: Function,
};

const Modal = (props: Props) => {
  const {
    content: Content,
    actions: Actions,
    id,
    modalProps,
    isOpen,
    hideModal,
  } = props;
  // Pick more props as needed.
  // Dialog props: https://material-ui-next.com/api/dialog/
  const dialogProps = R.pick(['onExited'], modalProps);
  const { title, ...rest } = modalProps;

  return (
    <Dialog
      key="1"
      open={isOpen}
      onRequestClose={() => hideModal(id)}
      ignoreEscapeKeyUp
      {...dialogProps}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{Content && <Content {...rest} />}</DialogContent>
      {Actions && (
        <DialogActions>
          <Actions {...rest} />
        </DialogActions>
      )}
    </Dialog>
  );
};

Modal.defaultProps = {
  modalProps: {},
};

const mapStateToProps = createStructuredSelector({
  content: selectors.modalContentSelector,
  actions: selectors.modalActionsSelector,
  isOpen: selectors.isOpenSelector,
});

const mapDispatchToProps = {
  hideModal: modalActions.hideModal,
};

export default R.compose(connect(mapStateToProps, mapDispatchToProps))(Modal);
