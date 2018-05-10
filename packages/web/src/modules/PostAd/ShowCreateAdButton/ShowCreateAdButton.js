import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import withStyles from 'material-ui/styles/withStyles';
import PhotoCameraIcon from 'material-ui-icons/PhotoCamera';
import { actions as modalActions } from 'store/modals';
import Button from 'components/Button/Button';
import TrackOnCall from 'modules/Mixpanel/TrackOnCall/TrackOnCall';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit,
  },
});

const ShowCreateAdButton = ({ openModal, classes, children, ...rest }) => (
  <TrackOnCall>
    {({ track }) => (
      <Button
        {...rest}
        onClick={track(() => openModal('createAd'), 'openedCreateAdDialog')}
      >
        <PhotoCameraIcon className={classes.icon} />
        {children}
      </Button>
    )}
  </TrackOnCall>
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
