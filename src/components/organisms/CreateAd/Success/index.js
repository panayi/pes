import React from 'react';
import { Grid, Typography, withStyles } from 'material-ui';
import DoneIcon from 'material-ui-icons/CheckCircle';

const styles = theme => ({
  root: {
    width: 450,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    color: theme.palette.primary[500],
  },
});

const CreateAdSuccess = ({ classes }) => (
  <Grid
    container
    direction="column"
    alignItems="center"
    justify="center"
    className={classes.root}
  >
    <Grid item>
      <DoneIcon className={classes.icon} />
    </Grid>
    <Grid item>
      <Typography>Your ad has been posted!</Typography>
    </Grid>
  </Grid>
);

export default withStyles(styles)(CreateAdSuccess);
