import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  appBar: {
    zIndex: 1201, // 1 more than sidebar
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.common.white,
    borderBottom: [1, 'solid', theme.palette.divider],
    boxShadow: 'none',
  },
  toolbar: {
    display: 'flex',
    flex: '1 1 auto',
    padding: 0,
    minHeight: theme.layout.headerHeight.phone,
    [theme.breakpoints.up(theme.map.tablet)]: {
      minHeight: theme.layout.headerHeight.tablet,
    },
  },
});

const Header = ({ children, classes }) => (
  <AppBar className={classes.appBar}>
    <Toolbar className={classes.toolbar}>{children}</Toolbar>
  </AppBar>
);

export default withStyles(styles)(Header);
