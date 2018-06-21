import React from 'react';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/core/styles/withStyles';
import CloseButton from '../../CloseButton/CloseButton';

const styles = theme => ({
  root: {
    display: 'flex',
    padding: [0, theme.spacing.unit * 3],
  },
  action: {
    marginLeft: -theme.spacing.unit * 1.5,
  },
  flex: {
    flex: 1,
  },
});

class DesktopTitle extends React.Component {
  renderAction() {
    const { closeButton, action, onClose } = this.props;

    if (action) {
      return action;
    }

    if (closeButton) {
      return <CloseButton onClose={onClose} />;
    }

    return null;
  }

  render() {
    const { title, classes } = this.props;
    const finalAction = this.renderAction();

    return (
      <Toolbar className={classes.root}>
        {finalAction && <div className={classes.action}>{finalAction}</div>}
        <Typography className={classes.flex} variant="title">
          {title}
        </Typography>
      </Toolbar>
    );
  }
}

export default withStyles(styles)(DesktopTitle);
