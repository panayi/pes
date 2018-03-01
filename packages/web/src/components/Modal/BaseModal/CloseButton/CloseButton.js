import React from 'react';
import IconButton from 'material-ui/IconButton';
import { Close } from 'material-ui-icons';

const CloseButton = ({ onClose, className }) => (
    <IconButton className={className} color="inherit" onClick={onClose}>
      <Close />
    </IconButton>
  );

export default CloseButton;
