import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { actions as modalActions } from '@pesposa/client-core/src/store/modals';
import Button from '@pesposa/client-core/src/components/Button/Button';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit,
  },
});

const ShowCreateAdButton = ({ openModal, classes, children, ...rest }) => (
  <Button {...rest} onClick={() => openModal('createAd')}>
    <PhotoCameraIcon className={classes.icon} />
    {children}
  </Button>
);

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

ShowCreateAdButton.defaultProps = {
  children: 'Sell',
  variant: 'raised',
  color: 'primary',
};

export default R.compose(connect(null, mapDispatchToProps), withStyles(styles))(
  ShowCreateAdButton,
);
