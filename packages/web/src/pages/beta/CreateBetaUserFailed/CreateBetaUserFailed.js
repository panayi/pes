import React from 'react';
import Typography from 'material-ui/Typography';
import withStyles from 'material-ui/styles/withStyles';
import * as pesposaConfig from '@pesposa/core/src/config/pesposa';

// BETA

const styles = theme => ({
  root: {
    width: 450,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: `0 auto ${theme.spacing.unit * 3}px auto`,
  },
});

const CreateBetaUserFailed = ({ DialogContent, classes }) => (
  <React.Fragment>
    <DialogContent>
      <div className={classes.root}>
        <Typography>
          Something went wrong and we couldn&apos;t create your account. Please
          contact support:{' '}
          <a href={`mailto:${pesposaConfig.SUPPORT_EMAIL_ADDRESS}`}>
            {pesposaConfig.SUPPORT_EMAIL_ADDRESS}
          </a>.
        </Typography>
      </div>
    </DialogContent>
  </React.Fragment>
);

export default withStyles(styles)(CreateBetaUserFailed);
