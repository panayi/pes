import React from 'react';
import classNames from 'classnames';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  content: {
    transform: 'translateZ(0)',
    [theme.breakpoints.down(theme.map.tablet)]: {
      marginTop: theme.spacing.unit * 2,
    },
  },
});

const Content = ({ className, children, classes }) => (
  <React.Fragment>
    <DialogContent className={classNames(classes.content, className)}>
      {children}
    </DialogContent>
  </React.Fragment>
);

export default withStyles(styles)(Content);
