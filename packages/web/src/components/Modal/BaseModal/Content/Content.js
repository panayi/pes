import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { setDisplayName } from 'recompose';
import { DialogContent } from 'material-ui/Dialog';
import withStyles from 'material-ui/styles/withStyles';

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

export default R.compose(setDisplayName('DialogContent'), withStyles(styles))(
  Content,
);
