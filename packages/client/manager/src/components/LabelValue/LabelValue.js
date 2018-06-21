import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing.unit,
  },
  value: {
    paddingLeft: theme.spacing.unit / 2,
  },
});

const LabelValue = ({ label, value, classes }) => (
  <div className={classes.root}>
    <Typography color="textSecondary">{label}:</Typography>
    <Typography className={classes.value}>{value}</Typography>
  </div>
);

export default withStyles(styles)(LabelValue);
