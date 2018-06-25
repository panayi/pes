import React from 'react';
import * as R from 'ramda';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import needsNonAdmin from 'hocs/needsNonAdmin';
import Layout from '../components/Layout/Layout';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    textAlign: 'center',
  },
});

const Unauthorized = ({ classes }) => (
  <Layout noSidebar>
    <div className={classes.root}>
      <Typography variant="headline">Unauthorized access</Typography>
    </div>
  </Layout>
);

export default R.compose(
  needsNonAdmin(),
  withStyles(styles),
)(Unauthorized);
