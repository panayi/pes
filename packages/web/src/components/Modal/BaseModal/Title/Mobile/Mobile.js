import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import CloseButton from '../../CloseButton/CloseButton';

const styles = () => ({
  appBar: {
    position: 'relative',
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  action: {
    flex: '0 0 auto',
    minWidth: 48,
  },
});

const MobileTitle = props => {
  const { title, action, secondaryAction, onClose, children, classes } = props;

  return (
    <AppBar className={classes.appBar}>
      <Toolbar disableGutters>
        <div className={classes.action}>
          {action || <CloseButton onClose={onClose} />}
        </div>
        {children || (
          <div className={classes.title}>
            <Typography variant="title" color="inherit">
              {title}
            </Typography>
          </div>
        )}
        <div className={classes.action}>{secondaryAction}</div>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(MobileTitle);
