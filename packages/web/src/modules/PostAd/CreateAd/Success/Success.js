import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import DoneIcon from 'material-ui-icons/CheckCircle';
import EmptyHero from 'components/EmptyHero/EmptyHero';

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
  renderContent,
  renderActions,
  classes,
  hideModal,
}) => (
  <div>
    {renderContent(
      <div className={classes.root}>
        <div className={classes.success}>
          <EmptyHero icon={DoneIcon} tagline="Your ad has been posted!" small />
        </div>
        <Button onClick={onPostAnotherClick} variant="raised" color="primary">
          Post another ad
        </Button>
      </div>,
    )}
    {renderActions(<Button onClick={() => hideModal()}>Close</Button>)}
  </div>
);

export default withStyles(styles)(CreateAdSuccess);