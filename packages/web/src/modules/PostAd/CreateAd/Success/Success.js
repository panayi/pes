import React from 'react';
import withStyles from 'material-ui/styles/withStyles';
import DoneIcon from 'material-ui-icons/CheckCircle';
import EmptyHero from 'components/EmptyHero/EmptyHero';
import Button from 'components/Button/Button';

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

const CreateAdSuccess = ({
  onPostAnotherClick,
  DialogContent,
  DialogActions,
  classes,
  closeModal,
}) => (
  <React.Fragment>
    <DialogContent>
      <div className={classes.root}>
        <div className={classes.success}>
          <EmptyHero icon={DoneIcon} tagline="Your ad has been posted!" small />
        </div>
        <Button onClick={onPostAnotherClick} variant="raised" color="primary">
          Post another ad
        </Button>
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => closeModal()}>Close</Button>
    </DialogActions>
  </React.Fragment>
);

export default withStyles(styles)(CreateAdSuccess);
