import React from 'react';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    padding: [
      theme.spacing.unit * 3,
      theme.spacing.unit * 3,
      theme.spacing.unit * 2.5,
    ],
  },
  action: {
    marginRight: theme.spacing.unit * 3,
    '& > button': {
      width: 'auto',
      height: 'auto',
    },
  },
});

class DesktopTitle extends React.Component {
  renderDesktopAction() {
    const { action, classes } = this.props;

    return action ? (
      <div className={classes.onlyActionWrap}>
        <div className={classes.onlyAction}>{action}</div>
      </div>
    ) : null;
  }

  render() {
    const { title, action, classes } = this.props;

    return (
      <div className={classes.root}>
        {action && <div className={classes.action}>{action}</div>}
        <Typography variant="title" color="inherit">
          {title}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(DesktopTitle);
