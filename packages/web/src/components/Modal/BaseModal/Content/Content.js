import React from 'react';
import * as R from 'ramda';
import classNames from 'classnames';
import { setDisplayName } from 'recompose';
import { DialogContent } from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  content: {
    [theme.breakpoints.down(theme.map.phone)]: {
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
