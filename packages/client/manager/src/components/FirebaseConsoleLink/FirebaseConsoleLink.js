import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import LaunchIcon from '@material-ui/icons/Launch';
import Link from '@pesposa/client-core/src/components/Link/Link';
import { getFirebaseConsoleUrl } from 'config/firebase';

const styles = {
  root: {
    minWidth: 0,
  },
};

const FirebaseConsoleLink = ({ firebasePath, classes }) => (
  <Link
    className={classes.root}
    component={IconButton}
    color="secondary"
    to={getFirebaseConsoleUrl(firebasePath)}
    target="_blank"
  >
    <LaunchIcon />
  </Link>
);

export default withStyles(styles)(FirebaseConsoleLink);
