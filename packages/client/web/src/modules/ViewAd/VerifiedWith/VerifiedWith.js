import React from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import ListUserProviders from '@pesposa/client-core/src/modules/User/ListUserProviders/ListUserProviders';

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
    [theme.breakpoints.down(theme.map.tablet)]: {
      marginLeft: 0,
    },
  },
});

const VerifiedWith = ({ user, className, classes }) => (
  <div className={classNames(classes.verified, className)}>
    <ListUserProviders
      className={classes.userProviders}
      userId={user}
      hideDisabled
      prefix={<Typography color="inherit">Verified with&nbsp;</Typography>}
    />
  </div>
);

export default withStyles(styles)(VerifiedWith);
