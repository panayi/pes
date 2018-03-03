import React from 'react';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import ListUserProviders from 'components/ListUserProviders/ListUserProviders';

const styles = theme => ({
  verified: {
    display: 'flex',
    alignItems: 'center',
  },
  userProviders: {
    display: 'flex',
    marginLeft: theme.spacing.unit,
    zoom: 0.7, // TODO: refactor
    '& > div + div': {
      marginLeft: theme.spacing.unit,
    },
  },
});

const VerifiedWith = ({ user, size, className, classes }) => {
  return (
    <div className={classNames(classes.verified, className)}>
      <Typography color="inherit">Verified with&nbsp;</Typography>
      <ListUserProviders
        className={classes.userProviders}
        userId={user}
        hideDisabled
      />
    </div>
  )
}

export default withStyles(styles)(VerifiedWith)
