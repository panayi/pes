// @flow weak
import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Dialog, DialogTitle, DialogContent, DialogActions } from 'material-ui';
import { selectors, actions as modalActions } from 'store/modal';
import ShowButton from './ShowButton';
import HideButton from './HideButton';

type ModalProps = {
  title: String, // eslint-disable-line react/no-unused-prop-types
  actions: React$Node | Array<React$Node>, // eslint-disable-line react/no-unused-prop-types
};

type Props = {
  content: React$Component<*>,
  modalProps: ModalProps,
  isOpen: boolean,
  hideModal: Function,
};

const Modal = (props: Props) => {
  const { content: Content, modalProps, isOpen, hideModal } = props;
  const { title, actions, ...passthroughProps } = modalProps;

  return (
    <Dialog
      key="1"
      open={isOpen}
      onRequestClose={hideModal}
      ignoreEscapeKeyUp
    >
      {
        title &&
          <DialogTitle>
            {title}
          </DialogTitle>
      }
      <DialogContent>
        {Content && <Content {...passthroughProps} />}
      </DialogContent>
      {
        actions &&
          <DialogActions>
            {actions}
          </DialogActions>
      }
    </Dialog>
  );
};

Modal.defaultProps = {
  modalProps: {},
};

const mapStateToProps = createStructuredSelector({
  content: selectors.modalComponentSelector,
  modalProps: selectors.modalPropsSelector,
  isOpen: selectors.isOpenSelector,
});

const mapDispatchToProps = {
  hideModal: modalActions.hideModal,
};

Modal.showButton = ShowButton;
Modal.hideButton = HideButton;

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Modal);
