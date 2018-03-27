import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import withStyles from 'material-ui/styles/withStyles';
import PhotoCameraIcon from 'material-ui-icons/PhotoCamera';
import { actions as modalActions } from 'store/modals';
import Button from 'components/Button/Button';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit,
  },
});

const ShowCreateAdButton = ({ openModal, classes, ...rest }) => (
  <Button {...rest} onClick={() => openModal('createAd')}>
    <PhotoCameraIcon className={classes.icon} />
    Sell on Pesposa
  </Button>
);

const mapDispatchToProps = {
  openModal: modalActions.openModal,
};

ShowCreateAdButton.defaultProps = {
  variant: 'raised',
  color: 'primary',
};

export default R.compose(connect(null, mapDispatchToProps), withStyles(styles))(
  ShowCreateAdButton,
);
