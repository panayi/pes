/* @flow */
import React from 'react';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';

type Props = {
  children: React$Node,
  classes: Object,
};

// Based on:
// https://github.com/callemall/material-ui/blob/v1-beta/docs/src/modules/components/AppDrawerNavItem.js

const styles = theme => {
  const spacing = 2 * theme.spacing.unit;
  const width = theme.layout.sidebarWidth - 2 * spacing;

  return {
    sidebar: {
      flex: [0, 0, `${theme.layout.sidebarWidth}px`],
    },
    drawerPaper: {
      width,
    },
    drawerAnchor: {
      top: theme.layout.headerHeight,
      padding: spacing,
    },
  };
};

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
