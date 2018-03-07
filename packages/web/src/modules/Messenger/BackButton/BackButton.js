import React from 'react';
import { MobileScreen } from 'react-responsive-redux';
import { withStyles } from 'material-ui/styles';
import Link from 'components/Link/Link';
import BaseBackButton from 'components/BackButton/BackButton';

const styles = theme => ({
  backButton: {
    width: 40,
    height: 40,
    marginRight: theme.spacing.unit,
    background: theme.palette.action.selected,
  },
});

const BackButton = ({ defaultLocation, classes }) => (
  <MobileScreen>
    <BaseBackButton
      component={Link.icon}
      defaultLocation={defaultLocation}
      className={classes.backButton}
      size="small"
    />
  </MobileScreen>
);

export default withStyles(styles)(BackButton);
