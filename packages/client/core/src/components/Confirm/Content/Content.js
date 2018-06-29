import React from 'react';
import * as R from 'ramda';
import { withProps, withState } from 'recompose';
import Typography from '@material-ui/core/Typography';
import Button from '../../Button/Button';

const ConfirmContent = ({
  message,
  acceptLabel,
  rejectLabel,
  DialogContent,
  DialogActions,
  closeModal,
  onClick,
  isPending,
}) => (
  <React.Fragment>
    <DialogContent>
      <Typography variant="subheading">{message}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => closeModal()} disabled={isPending}>
        {rejectLabel}
      </Button>
      <Button
        variant="raised"
        color="primary"
        onClick={onClick}
        disabled={isPending}
      >
        {acceptLabel}
      </Button>
    </DialogActions>
  </React.Fragment>
);

export default R.compose(
  withState('isPending', 'setIsPending', false),
  withProps(({ onAccept, closeModal, setIsPending }) => ({
    onClick: async () => {
      setIsPending(true);
      await onAccept();
      closeModal();
      setIsPending(false);
    },
  })),
)(ConfirmContent);
