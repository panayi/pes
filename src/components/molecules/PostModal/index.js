import React from 'react';
import { withStyles } from 'material-ui';
import Modal from 'components/molecules/Modal';

const styles = {
  root: {
    width: 450,
    minHeight: 350,
  },
};

export const PostModal = (props) => {
  const { classes, children, ...otherProps } = props;

  return (
    <Modal
      {...otherProps}
      classes={{
        paper: classes.root,
      }}
    >
      {children}
    </Modal>
  );
};

export default withStyles(styles)(PostModal);
