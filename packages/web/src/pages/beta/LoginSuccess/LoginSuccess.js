import React from 'react';
import withStyles from 'material-ui/styles/withStyles';
import DoneIcon from 'material-ui-icons/CheckCircle';
import EmptyHero from 'components/EmptyHero/EmptyHero';
import Button from 'components/Button/Button';

// BETA

const styles = theme => ({
  root: {
    width: 450,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  success: {
    marginBottom: theme.spacing.unit * 3,
  },
});

const LoginSuccess = ({
  DialogContent,
  DialogActions,
  classes,
  closeModal,
}) => (
  <React.Fragment>
    <DialogContent>
      <div className={classes.root}>
        <div className={classes.success}>
          <EmptyHero
            icon={DoneIcon}
            title="Thanks for the interest!"
            tagline="We have received your request for beta access, and we will follow up with you shortly."
            small
          />
        </div>
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => closeModal()}>Close</Button>
    </DialogActions>
  </React.Fragment>
);

export default withStyles(styles)(LoginSuccess);
