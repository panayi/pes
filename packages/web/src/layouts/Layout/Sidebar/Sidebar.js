/* @flow */
import React from 'react';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';

type Props = {
  children: React$Node,
  className: ?string,
  classes: Object,
};

// Based on:
// https://github.com/callemall/material-ui/blob/v1-beta/docs/src/modules/components/AppDrawerNavItem.js

const styles = theme => {
  const hSpacing = 1.5 * theme.spacing.unit;
  const vSpacing = 3 * theme.spacing.unit;
  const width = theme.layout.sidebarWidth;

  return {
    sidebar: {
      flex: [0, 0, `${theme.layout.sidebarWidth}px`],
    },
    drawerPaper: {
      width,
      backgroundColor: 'transparent',
    },
    drawerAnchor: {
      border: 0,
      // Fixes sluggish scroll,
      // see: https://stackoverflow.com/a/15147497/359104
      transform: 'translate3d(0, 0, 0)',
      WebkitBackfaceVisibility: 'hidden',
      WebkitPerspective: 1000,
    },
    content: {
      padding: [vSpacing, 0, vSpacing, hSpacing],
      [theme.breakpoints.up(theme.map.phone)]: {
        marginTop: theme.layout.headerHeight.phone,
      },
      [theme.breakpoints.up(theme.map.tablet)]: {
        marginTop: theme.layout.headerHeight.tablet,
      },
    },
  };
};

const Sidebar = ({ children, className, classes }: Props) => (
  <div className={classNames(classes.sidebar, className)}>
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
        paperAnchorDockedLeft: classes.drawerAnchor,
      }}
      elevation={0}
    >
      <div className={classes.content}>{children}</div>
    </Drawer>
  </div>
);

export default withStyles(styles)(Sidebar);
