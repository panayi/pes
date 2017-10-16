// @flow weak
import React from 'react';
import { withStateHandlers } from 'recompose';
import { Dialog, DialogTitle, Button } from 'material-ui';

type Props = {
  children: React$Node,
  isOpen: boolean,
  open: Function,
  close: Function,
  toggleContent: String | React$Node,
  modalTitle: String | React$Node,
  buttonProps: Object,
};

const Modal = (props: Props) => {
  const { isOpen, open, close, children, toggleContent, modalTitle, buttonProps,
    ...otherProps } = props;

  const dialog = (
    <Dialog
      key="1"
      {...otherProps}
      open={isOpen}
      onRequestClose={close}
    >
      {
        modalTitle &&
          <DialogTitle>
            {modalTitle}
          </DialogTitle>
      }
      {children}
    </Dialog>
  );

  if (toggleContent) {
    return [
      <Button
        key="0"
        {...buttonProps}
        onClick={open}
      >
        {toggleContent}
      </Button>,
      dialog,
    ];
  }

  return dialog;
};

Modal.defaultProps = {
  defaultOpen: false,
  buttonProps: {},
};

export default withStateHandlers(
  ({ defaultOpen = false }) => ({
    isOpen: defaultOpen,
  }),
  {
    open: () => () => ({
      isOpen: true,
    }),
    close: () => () => ({
      isOpen: false,
    }),
  },
)(Modal);
