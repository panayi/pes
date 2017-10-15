/* @flow */
import React from 'react';
import { withStyles } from 'material-ui/styles';

type Props = {
  children: React$Node,
  classes: Object
};

const styles = {
  content: {
    padding: '24px',
  },
};

const Content = ({ children, classes }: Props) => (
  <div className={classes.content}>
    {children}
  </div>
);

export default withStyles(styles)(Content);
