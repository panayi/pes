// @flow weak
import React from 'react';
import { withStateHandlers } from 'recompose';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from 'material-ui';

type Props = {
  children: React$Node,
  isOpen: boolean,
  open: Function,
  close: Function,
  modalTitle: String | React$Node,
  actions: React$Node,
  openButtonProps: Object,
};

const Modal = (props: Props) => {
  const { isOpen, open, close, children, modalTitle, actions, openButtonProps,
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
      <DialogContent>
        {children}
      </DialogContent>
      {
        actions &&
          <DialogActions>
            {actions}
          </DialogActions>
      }
    </Dialog>
  );

  if (openButtonProps) {
    return [
      <Button
        key="0"
        {...openButtonProps}
        onClick={open}
      />,
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
