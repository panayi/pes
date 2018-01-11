/* @flow */
import React from 'react';
import { Drawer } from 'material-ui';
import { withStyles } from 'material-ui/styles';

type Props = {
  children: React$Node,
  classes: Object,
};

// Based on:
// https://github.com/callemall/material-ui/blob/v1-beta/docs/src/modules/components/AppDrawerNavItem.js

const styles = theme => ({
  sidebar: {
    flex: `0 0 ${theme.custom.sidebarWidth}px`,
  },
  drawerPaper: {
    width: theme.custom.sidebarWidth,
  },
  drawerAnchor: {
    top: 64,
  },
});

const Sidebar = ({ children, classes }: Props) => (
  <div className={classes.sidebar}>
    <Drawer
      type="permanent"
      classes={{
        paper: classes.drawerPaper,
        paperAnchorDockedLeft: classes.drawerAnchor,
      }}
    >
      {children}
    </Drawer>
  </div>
);

export default withStyles(styles)(Sidebar);
