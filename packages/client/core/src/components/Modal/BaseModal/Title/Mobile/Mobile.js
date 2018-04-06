import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '../../../../../components/AppBar/AppBar';
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
  const { title, action, secondaryAction, onClose, classes } = props;

  return (
    <AppBar className={classes.appBar}>
      <Toolbar disableGutters>
        <div className={classes.action}>
          {action || <CloseButton onClose={onClose} />}
        </div>
        <div className={classes.title}>
          <Typography variant="title" color="inherit">
            {title}
          </Typography>
        </div>
        <div className={classes.action}>{secondaryAction}</div>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(MobileTitle);
